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
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import RandomForestClassifier
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

class trainingRF(object):
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
		canales=self.canales

		data = pd.read_csv("D:\TraingEEG\DataSetConstruido\DataSerCsvMa.csv",)
		print(data.head())
		data = np.array(data, dtype="float")
		(trainX, testX, trainY, testY) = train_test_split(np.delete(data, 10, axis=1), data[:,10], test_size=split_test_size, random_state=seed)

		os.system("mkdir Results\\results\\"+fromModel+"\\model\\"+destino+"\\img")
		model = RandomForestClassifier(n_estimators=100,)
		if(optimi=="Adam"):
			opt = Adam(lr=INIT_LR, decay=INIT_LR / EPOCHS)
		if(optimi=="RMSprop"):
			opt = RMSprop(lr=INIT_LR, decay=INIT_LR / EPOCHS)

		if(conaug):
			H = model.fit(x=aug.flow(trainX, trainY, batch_size=BS), validation_data=(testX, testY), steps_per_epoch=len(trainX) // BS,	epochs=EPOCHS, verbose=1)
		else:
			H = model.fit(trainX,trainY)

		os.system("mkdir Results\\results\\"+destino+"\\img")
		os.system("mkdir Results\\results\\"+destino+"\\model")
		os.system("mkdir Results\\results\\"+destino+"\\excels")
		if(arquitec=="LeNet"):
			os.system("mkdir Results\\results\\"+destino+"\\Semana_1_Experimentacion_LeNet")
		if(arquitec=="AlexNet"):
			os.system("mkdir Results\\results\\"+destino+"\\Semana_1_Experimentacion_AlexNet")
		if(arquitec=="RandomF"):
			os.system("mkdir Results\\results\\"+destino+"\\Semana_1_Experimentacion_RandomF")

		modelNamet = 'Results/results/'+destino+'/model/Ex'+str(self.numberOfExperiment)
		modelName = modelNamet+self.save_to_dir_model

		joblib.dump(model, modelNamet+'.pkl')

		numberClasses = self.numclasses
		numberOfExperiment = self.numberOfExperiment
		parameterOfMoficate = 'epochs'
		datasetName = self.path_to_dataset
		modelName = 'LeNet'
		nameFile = str(numberOfExperiment) + '_' + str(modelName) + '_'+ str(parameterOfMoficate)
		experimentPath = 'Results/results/'+destino+'/Semana_1_Experimentacion_LeNet'

		hyperparameter = {
			'id':[numberOfExperiment],
			'name_file' : [nameFile],
			'dataset_name': [datasetName],
			'lowfrec':[lowfrec],
			'highpass':[highpass],
			'aug':[conaug],
			'BS': [BS],
			'EPOCHS': [EPOCHS],
			'INIT_LR': [INIT_LR],
			'Class number': [numberClasses],
			'modelName': [modelName],
			'Seed' : [seed],
			'shear_range': ['None'],
			'orden ingreso Data':[listaD],
			'canales':[canales],
			'destino':[destino]
			}
		class_names = ['insatisfecho','satisfecho']

		predictions = model.predict(testX)
		print(accuracy_score(testY, predictions))
		print(confusion_matrix(testY, predictions))
		matc=confusion_matrix(testY, predictions)
		print("matc")
		plt.style.use("ggplot")
		plt.figure()
		plot_confusion_matrix(conf_mat=matc, figsize=(9,9), class_names = class_names, show_normed=False)
		plt.tight_layout()
		plt.title("Matrix test")
		plt.xlabel("Predictions")
		plt.ylabel("Actual")
		plt.legend(loc="lower left")
		imgName='Results/results/'+fromModel+'/model/'+destino+'/img/matrixTest'+str(self.numberOfExperiment)
		imgName=imgName+'training_results.png'
		plt.savefig(imgName)
		print(metrics.classification_report(testY,predictions, digits = 4))

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
		imgName='Results/results/'+fromModel+'/model/'+destino+'/img/Confusion_matrix_for_'+arquitec+'_Model'+str(self.numberOfExperiment)
		imgName=imgName+'.png'
		plt.savefig(imgName)

		print("Fin")