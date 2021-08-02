import matplotlib
matplotlib.use("Agg")
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.losses import mean_squared_error
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.utils import to_categorical
from Classification.Training.architecture.LeNet import LeNet,AlexNet,RandomF
from utils.paths import list_bdfs, list_files
import matplotlib.pyplot as plt
import numpy as np
import argparse
import random
import os
import mne
from utils.flt import filters
from utils.xls import crearxls
from utils.c2df import converttoDataFrame, addAnnotation
import glob
import pandas as pd
import pickle
import openpyxl
from sklearn.metrics import confusion_matrix, f1_score, roc_curve, precision_score, recall_score, accuracy_score, roc_auc_score
from sklearn import metrics
from mlxtend.plotting import plot_confusion_matrix
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.vgg16 import preprocess_input
import joblib
import seaborn as sns

def readBdf(path,lowfrec,highpass,canales,name):
    raw = mne.io.read_raw_bdf(path, preload=True)
    raw_selection = raw.crop(tmin=1, tmax=12)
    raw_selection.pick_channels(canales)
    eeg_picks = mne.pick_types(raw_selection.info, eeg=True)
    raw_filtered=filters(raw_selection,eeg_picks,lowfrec,highpass)
    df=converttoDataFrame(raw_filtered, name)
    return df

class trainingMatriz(object):
	def __init__(self, path_to_dataset, save_to_dir_model, lbl, bs, epochs, lr, seed, numclasses, splitDataset,numberOfExperiment,lowfrec,highpass,conaug,canales,destino,ordendata,arquitec,optimi,fromModel,modeloh5):
		self.path_to_dataset = path_to_dataset
		self.save_to_dir_model = save_to_dir_model
		self.lbl = lbl
		self.bs = bs
		self.epochs = epochs
		self.lr = lr
		self.seed = seed
		self.numclasses = numclasses
		self.test_size = splitDataset
		self.numberOfExperiment = numberOfExperiment
		self.lowfrec = lowfrec
		self.highpass = highpass
		self.conaug=conaug
		self.canales=canales
		self.destino=destino
		self.ordendata=ordendata
		self.arquitec=arquitec
		self.optimi=optimi
		self.fromModel=fromModel
		self.modeloh5=modeloh5

	def labeled(self,label):
		return self.lbl.get(label)

	def train(self):
		path_code = os.getcwd()
		BS = self.bs
		EPOCHS = self.epochs
		INIT_LR = self.lr
		seed = self.seed
		split_test_size = self.test_size
		total_classes = self.numclasses
		data = []
		labels = []
		listaD = []
		lowfrec = self.lowfrec
		highpass = self.highpass
		conaug=self.conaug
		ordendata=self.ordendata
		destino=self.destino
		arquitec=self.arquitec
		optimi=self.optimi
		fromModel=self.fromModel
		modeloh5=self.modeloh5

		def clear():
			if os.name == 'nt':
				os.system("cls")
			else:
				os.system("clear")

		bdfPaths = sorted(list(list_bdfs(self.path_to_dataset)))
		if(ordendata==[]):
			random.shuffle(bdfPaths)
		else:
			bdfPaths=ordendata
		withData = None
		heightData = None
		flag = True
		canales=self.canales
		for bdfPath in bdfPaths:
			filename = os.path.join(path_code, bdfPath)
			palabra = bdfPath.replace("dataset","").replace("\insatisfecho","").replace("\satisfecho","").replace("\S","S").replace("\I","I").split(".")[0]
			df=readBdf(filename,lowfrec,highpass,canales,palabra)
			bdf = df.to_numpy()
			if flag == True:
				heightData = bdf.shape[0]
				withData = bdf.shape[1]
				flag = False
			bdf = img_to_array(bdf)
			data.append(bdf)
			label = bdfPath.split(os.path.sep)[-2]
			label = self.labeled(label)
			labels.append(label)
			listaD.append(bdfPath)
			clear()
		data = np.array(data, dtype="float")
		labels = np.array(labels)

		(trainX, testX, trainY, testY) = train_test_split(data, labels, test_size=split_test_size, random_state=seed)

		os.system("mkdir Results\\results\\"+fromModel+"\\model\\"+destino+"\\img")
		os.system("mkdir Results\\results\\"+fromModel+"\\model\\"+destino+"\\txt")
		names = ['insatisfecho','satisfecho']
		class_names = ['insatisfecho','satisfecho']
		custom_Model = load_model("D:/TraingEEG/Results/results/"+fromModel+"/model/"+modeloh5+"")

		predictions = custom_Model.predict(testX)
		y_pred = np.argmax(predictions, axis=1)
		matc=confusion_matrix(testY, y_pred)
		print("matc")
		plt.style.use("ggplot")
		plt.figure()
		plot_confusion_matrix(conf_mat=matc, figsize=(9,9), class_names = names, show_normed=False)
		plt.tight_layout()
		plt.title("Matrix test")
		plt.xlabel("Predictions")
		plt.ylabel("Actual")
		plt.legend(loc="lower left")
		imgName='Results/results/'+fromModel+'/model/'+destino+'/img/matrixTest'+str(self.numberOfExperiment)
		imgName=imgName+'training_results.png'
		plt.savefig(imgName)
		print(metrics.classification_report(testY,y_pred, digits = 4))
		txtName='Results/results/'+fromModel+'/model/'+destino+'/txt/'
		txtName=txtName+"txtmetrics"+str(self.numberOfExperiment)+".txt"
		file1 = open(txtName,"a")
		file1.write(metrics.classification_report(testY,y_pred, digits = 4))
		file1.close()

		matc = matc.astype('float') / matc.sum(axis=1)[:, np.newaxis]

		plt.figure(figsize=(16,7))
		sns.set(font_scale=1.4)
		sns.heatmap(matc, annot=True, annot_kws={'size':10}, cmap=plt.cm.Greens, linewidths=0.2)

		tick_marks = np.arange(len(class_names))
		tick_marks2 = tick_marks + 0.5
		plt.xticks(tick_marks, class_names, rotation=25)
		plt.yticks(tick_marks2, class_names, rotation=0)
		plt.xlabel('Predicted label')
		plt.ylabel('True label')
		plt.title('Confusion matrix for Random Forest Model')
		imgName='Results/results/'+fromModel+'/model/'+destino+'/img/Confusion_matrix_for_'+arquitec+'_'+optimi+'_Model'+str(self.numberOfExperiment)
		imgName=imgName+'.png'
		plt.savefig(imgName)

		print("Confusion matrix end")