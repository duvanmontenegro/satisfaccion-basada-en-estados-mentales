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
	# df=converttoDataFrame(raw_filtered)
	df=converttoDataFrame(raw_filtered, name)
	# print(df.shape)
	# print(df.iloc[:10, ::])
	return df

class training(object):
	def __init__(self, path_to_dataset, save_to_dir_model, lbl, bs, epochs, lr, seed, numclasses, splitDataset,numberOfExperiment,lowfrec,highpass,conaug,canales,destino,ordendata,arquitec,optimi):
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

		def clear():
			if os.name == 'nt':
				os.system("cls")
			else:
				os.system("clear")

		bdfPaths = sorted(list(list_bdfs(self.path_to_dataset)))
		# random.seed(seed)
		if(ordendata==[]):
			random.shuffle(bdfPaths)
		else:
			bdfPaths=ordendata
		withData = None
		heightData = None
		flag = True
		canales=self.canales
		for bdfPath in bdfPaths:
			print("bdfPath:",bdfPath)
			filename = os.path.join(path_code, bdfPath)
			palabra = bdfPath.replace("dataset","").replace("\insatisfecho","").replace("\satisfecho","").replace("\S","S").replace("\I","I").split(".")[0]
			df=readBdf(filename,lowfrec,highpass,canales,palabra)
			print("palabra:",palabra)

			bdf = df.to_numpy()
			print("bdf:",bdf)
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
		trainY = to_categorical(trainY, num_classes=total_classes)
		testY = to_categorical(testY, num_classes=total_classes)

		if(conaug):
			aug = ImageDataGenerator(rotation_range=30, width_shift_range=0.1, height_shift_range=0.1, shear_range=0.2, zoom_range=0.2, horizontal_flip=True, fill_mode="nearest")
			print("Entro - aug1")
		if(arquitec=="LeNet"):
			model = LeNet.build(width=withData, height=heightData, depth=1, classes=total_classes)
		if(arquitec=="AlexNet"):
			model = AlexNet.build(width=withData, height=heightData, depth=1, classes=total_classes)
		if(arquitec=="RandomF"):
			model = RandomF.build(width=withData, height=heightData, depth=1, classes=total_classes)
			
		if(optimi=="Adam"):
			opt = Adam(lr=INIT_LR, decay=INIT_LR / EPOCHS)
		if(optimi=="RMSprop"):
			opt = RMSprop(lr=INIT_LR, decay=INIT_LR / EPOCHS)
		
		if(arquitec=="RandomF"):
			model.compile(loss=mean_squared_error, optimizer=opt, metrics=["accuracy"]) 
		else:
			model.compile(loss="categorical_crossentropy", optimizer=opt, metrics=["accuracy"]) 
		#w data_aug
		if(conaug):
			H = model.fit(x=aug.flow(trainX, trainY, batch_size=BS), validation_data=(testX, testY), steps_per_epoch=len(trainX) // BS,	epochs=EPOCHS, verbose=1)
		#w/out data_aug
		else:
			H = model.fit(x=trainX, y = trainY, batch_size=BS, validation_data=(testX, testY), steps_per_epoch=len(trainX) // BS, epochs=EPOCHS, verbose=1)

		os.system("mkdir Results\\results\\"+destino+"\\img")
		os.system("mkdir Results\\results\\"+destino+"\\model")
		os.system("mkdir Results\\results\\"+destino+"\\excels")
		# if(arquitec=="LeNet"):
		# 	os.system("mkdir Results\\results\\"+destino+"\\Semana_1_Experimentacion_LeNet")
		# if(arquitec=="AlexNet"):
		# 	os.system("mkdir Results\\results\\"+destino+"\\Semana_1_Experimentacion_AlexNet")
		# if(arquitec=="RandomF"):
		# 	os.system("mkdir Results\\results\\"+destino+"\\Semana_1_Experimentacion_RandomF")

		modelName = 'Results/results/'+destino+'/model/'
		modelNameM = 'Ex'+str(self.numberOfExperiment)+self.save_to_dir_model
		modelName = modelName+modelNameM
		model.save(modelName, include_optimizer=True)

		if(conaug):
			plt.style.use("ggplot")
			plt.figure()
			N = EPOCHS
			plt.plot(np.arange(0, N), H.history["loss"], label="train_loss")
			plt.plot(np.arange(0, N), H.history["val_loss"], label="val_loss")
			plt.plot(np.arange(0, N), H.history["accuracy"], label="train_acc")
			plt.plot(np.arange(0, N), H.history["val_accuracy"], label="val_acc")
			plt.title("Training Loss and Accuracy on dataset")
			plt.xlabel("Epoch #")
			plt.ylabel("Loss/Accuracy")
			plt.legend(loc="lower left")
			imgName='Results/results/'+destino+'/img/Ex'+str(self.numberOfExperiment)
			imgName=imgName+'Augtraining_results.png'
			plt.savefig(imgName)
		else:
			plt.style.use("ggplot")
			plt.figure()
			N = EPOCHS
			plt.plot(np.arange(0, N), H.history["loss"], label="train_loss")
			plt.plot(np.arange(0, N), H.history["val_loss"], label="val_loss")
			plt.plot(np.arange(0, N), H.history["accuracy"], label="train_acc")
			plt.plot(np.arange(0, N), H.history["val_accuracy"], label="val_acc")
			plt.title("Training Loss and Accuracy on dataset")
			plt.xlabel("Epoch #")
			plt.ylabel("Loss/Accuracy")
			plt.legend(loc="lower left")
			imgName='Results/results/'+destino+'/img/Ex'+str(self.numberOfExperiment)
			imgName=imgName+'training_results.png'
			plt.savefig(imgName)
		
		numberClasses = self.numclasses
		numberOfExperiment = self.numberOfExperiment
		parameterOfMoficate = 'epochs'
		datasetName = self.path_to_dataset
		modelName = 'LeNet'
		nameFile = str(numberOfExperiment) + '_' + str(modelName) + '_'+ str(parameterOfMoficate)
		experimentPath = 'Results/results/'+destino+'/Semana_1_Experimentacion_LeNet'

		def fewerListValue(lista):
			aux = lista[0]
			for i in lista:
				if(aux>i):
					aux = i
			return aux

		def biggestListValue(lista):
			aux = lista[0]
			for i in lista:
				if(aux<i):
					aux = i
			return aux

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
			'orden Data':[bdfPaths],
			'orden ingreso Data':[listaD],
			'canales':[canales],
			'loss_val' : [H.history['val_loss']],
			'lower_loss_val' : [fewerListValue(H.history['val_loss'])],
			'accuracy_val' : [H.history['val_accuracy']],
			'biggest_accuracy_val' : [biggestListValue(H.history['val_accuracy'])],
			'loss_train' : [H.history['loss']],
			'lower_loss_train' : [fewerListValue(H.history['loss'])],
			'accuracy_train': [H.history['accuracy']],
			'biggest_accuracy_train' : [biggestListValue(H.history['accuracy'])],
			'destino':[destino]
			}
		crearxls(model,conaug,bdfPaths,numberClasses,numberOfExperiment,parameterOfMoficate,datasetName,modelName,nameFile,experimentPath,hyperparameter,H,destino)
		print("Training end")