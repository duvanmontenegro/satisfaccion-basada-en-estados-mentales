from Classification.Training.training import training
from Classification.Training.matrizC import trainingMatriz
from Classification.Training.trainDataSetRF import trainingRF
import playsound
import glob

dataset = "dataset"
model_dir = "model.h5"
lbldic = {
		"insatisfecho":0,
		"satisfecho":1
	}
model_dir = "model.h5"

ordendataset=[]
#region Traing Random Forest
# noptimi="sgd"
# narquitec="RandomF"
# cdestino="RandoForesSinC7copia"
# fromModel=cdestino
# modeloh5="Ex1.pkl"
# trainer = trainingRF(path_to_dataset=dataset, 
# 	save_to_dir_model=model_dir, 
# 	lbl=lbldic, 
# 	bs=16, 
# 	epochs=1000, 
# 	lr=0.001, 
# 	seed=1, 
# 	numclasses=len(lbldic), 
# 	splitDataset=0.15,
# 	numberOfExperiment=1,
# 	lowfrec=1,
# 	highpass=40,
# 	conaug=False,
# 	canales=ncanales,
# 	destino=cdestino,
# 	ordendata=ordendataset,
# 	arquitec=narquitec,
# 	fromModel=fromModel,
# 	modeloh5=modeloh5,
# 	optimi=noptimi)
# trainer.train()
#endregion

# Se utiliza para entrenar bajo los parametros deseado 
# estos parametros se toamron despues de varias entrenamientos
ordendataset=['dataset\\insatisfecho\\Insatisfecho-u10-10.bdf', 'dataset\\satisfecho\\Satisfecho-u10-9.bdf', 'dataset\\satisfecho\\Satisfecho-u2-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-10.bdf', 'dataset\\satisfecho\\Satisfecho-u4-2.bdf', 'dataset\\satisfecho\\Satisfecho-u8-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-1.bdf', 'dataset\\satisfecho\\Satisfecho-u5-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-5.bdf', 'dataset\\satisfecho\\Satisfecho-u2-8.bdf', 'dataset\\satisfecho\\Satisfecho-u12-1.bdf', 'dataset\\satisfecho\\Satisfecho-u13-4.bdf', 'dataset\\satisfecho\\Satisfecho-u13-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-8.bdf', 'dataset\\satisfecho\\Satisfecho-u5-4.bdf', 'dataset\\satisfecho\\Satisfecho-u11-10.bdf', 'dataset\\satisfecho\\Satisfecho-u2-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-4.bdf', 'dataset\\satisfecho\\Satisfecho-u4-4.bdf', 'dataset\\satisfecho\\Satisfecho-u4-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-6.bdf', 'dataset\\satisfecho\\Satisfecho-u12-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-7.bdf', 'dataset\\satisfecho\\Satisfecho-u13-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-1.bdf', 'dataset\\satisfecho\\Satisfecho-u11-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-6.bdf', 'dataset\\satisfecho\\Satisfecho-u12-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-7.bdf', 'dataset\\satisfecho\\Satisfecho-u8-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-8.bdf', 'dataset\\satisfecho\\Satisfecho-u6-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-6.bdf', 'dataset\\satisfecho\\Satisfecho-u6-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-1.bdf', 'dataset\\satisfecho\\Satisfecho-u8-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-7.bdf', 'dataset\\satisfecho\\Satisfecho-u6-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-7.bdf', 'dataset\\satisfecho\\Satisfecho-u11-9.bdf', 'dataset\\satisfecho\\Satisfecho-u2-6.bdf', 'dataset\\satisfecho\\Satisfecho-u13-1.bdf', 'dataset\\satisfecho\\Satisfecho-u12-5.bdf', 'dataset\\satisfecho\\Satisfecho-u4-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-2.bdf', 'dataset\\satisfecho\\Satisfecho-u5-10.bdf', 'dataset\\satisfecho\\Satisfecho-u12-3.bdf', 'dataset\\satisfecho\\Satisfecho-u9-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-3.bdf', 'dataset\\satisfecho\\Satisfecho-u6-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-10.bdf', 'dataset\\satisfecho\\Satisfecho-u7-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-6.bdf', 'dataset\\satisfecho\\Satisfecho-u2-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-8.bdf', 'dataset\\satisfecho\\Satisfecho-u4-1.bdf', 'dataset\\satisfecho\\Satisfecho-u9-10.bdf', 'dataset\\satisfecho\\Satisfecho-u8-10.bdf', 'dataset\\satisfecho\\Satisfecho-u13-3.bdf', 'dataset\\satisfecho\\Satisfecho-u10-5.bdf', 'dataset\\satisfecho\\Satisfecho-u6-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-1.bdf', 'dataset\\satisfecho\\Satisfecho-u12-9.bdf', 'dataset\\satisfecho\\Satisfecho-u9-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-4.bdf', 'dataset\\satisfecho\\Satisfecho-u13-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-6.bdf', 'dataset\\satisfecho\\Satisfecho-u9-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-3.bdf', 'dataset\\satisfecho\\Satisfecho-u10-4.bdf', 'dataset\\satisfecho\\Satisfecho-u7-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-8.bdf', 'dataset\\satisfecho\\Satisfecho-u5-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-2.bdf', 'dataset\\satisfecho\\Satisfecho-u10-6.bdf', 'dataset\\satisfecho\\Satisfecho-u6-5.bdf', 'dataset\\satisfecho\\Satisfecho-u10-7.bdf', 'dataset\\satisfecho\\Satisfecho-u10-3.bdf', 'dataset\\satisfecho\\Satisfecho-u9-7.bdf', 'dataset\\satisfecho\\Satisfecho-u8-4.bdf', 'dataset\\satisfecho\\Satisfecho-u6-6.bdf', 'dataset\\satisfecho\\Satisfecho-u11-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-2.bdf', 'dataset\\satisfecho\\Satisfecho-u9-4.bdf', 'dataset\\satisfecho\\Satisfecho-u4-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-5.bdf', 'dataset\\satisfecho\\Satisfecho-u2-1.bdf', 'dataset\\satisfecho\\Satisfecho-u8-3.bdf', 'dataset\\satisfecho\\Satisfecho-u6-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-10.bdf', 'dataset\\satisfecho\\Satisfecho-u2-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-10.bdf', 'dataset\\satisfecho\\Satisfecho-u4-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-5.bdf', 'dataset\\satisfecho\\Satisfecho-u13-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-9.bdf', 'dataset\\satisfecho\\Satisfecho-u12-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-5.bdf', 'dataset\\satisfecho\\Satisfecho-u9-5.bdf', 'dataset\\satisfecho\\Satisfecho-u4-8.bdf', 'dataset\\satisfecho\\Satisfecho-u13-5.bdf', 'dataset\\satisfecho\\Satisfecho-u10-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-10.bdf', 'dataset\\satisfecho\\Satisfecho-u6-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-9.bdf', 'dataset\\satisfecho\\Satisfecho-u7-6.bdf', 'dataset\\satisfecho\\Satisfecho-u5-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-8.bdf', 'dataset\\satisfecho\\Satisfecho-u12-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-3.bdf', 'dataset\\satisfecho\\Satisfecho-u12-6.bdf', 'dataset\\satisfecho\\Satisfecho-u13-2.bdf', 'dataset\\satisfecho\\Satisfecho-u7-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-6.bdf', 'dataset\\satisfecho\\Satisfecho-u11-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-1.bdf', 'dataset\\satisfecho\\Satisfecho-u11-4.bdf', 'dataset\\satisfecho\\Satisfecho-u12-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-10.bdf', 'dataset\\satisfecho\\Satisfecho-u11-3.bdf', 'dataset\\satisfecho\\Satisfecho-u5-7.bdf', 'dataset\\satisfecho\\Satisfecho-u8-2.bdf', 'dataset\\satisfecho\\Satisfecho-u7-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u9-3.bdf', 'dataset\\satisfecho\\Satisfecho-u5-5.bdf', 'dataset\\satisfecho\\Satisfecho-u11-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-7.bdf', 'dataset\\satisfecho\\Satisfecho-u5-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u4-4.bdf', 'dataset\\satisfecho\\Satisfecho-u10-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-9.bdf', 'dataset\\satisfecho\\Satisfecho-u5-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-6.bdf', 'dataset\\satisfecho\\Satisfecho-u2-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-1.bdf', 'dataset\\satisfecho\\Satisfecho-u4-10.bdf', 'dataset\\satisfecho\\Satisfecho-u5-6.bdf', 'dataset\\satisfecho\\Satisfecho-u8-9.bdf', 'dataset\\satisfecho\\Satisfecho-u11-5.bdf', 'dataset\\satisfecho\\Satisfecho-u7-3.bdf', 'dataset\\satisfecho\\Satisfecho-u8-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u5-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-9.bdf', 'dataset\\satisfecho\\Satisfecho-u7-8.bdf', 'dataset\\satisfecho\\Satisfecho-u2-7.bdf', 'dataset\\satisfecho\\Satisfecho-u9-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-7.bdf', 'dataset\\satisfecho\\Satisfecho-u4-6.bdf', 'dataset\\satisfecho\\Satisfecho-u9-8.bdf', 'dataset\\satisfecho\\Satisfecho-u8-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-1.bdf', 'dataset\\insatisfecho\\Insatisfecho-u2-7.bdf', 'dataset\\satisfecho\\Satisfecho-u7-1.bdf', 'dataset\\satisfecho\\Satisfecho-u10-10.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-2.bdf', 'dataset\\satisfecho\\Satisfecho-u11-8.bdf', 'dataset\\satisfecho\\Satisfecho-u6-2.bdf', 'dataset\\satisfecho\\Satisfecho-u10-8.bdf', 'dataset\\insatisfecho\\Insatisfecho-u8-2.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-4.bdf', 'dataset\\satisfecho\\Satisfecho-u13-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-4.bdf', 'dataset\\satisfecho\\Satisfecho-u9-6.bdf', 'dataset\\insatisfecho\\Insatisfecho-u12-9.bdf', 'dataset\\insatisfecho\\Insatisfecho-u10-3.bdf', 'dataset\\insatisfecho\\Insatisfecho-u6-4.bdf', 'dataset\\insatisfecho\\Insatisfecho-u13-3.bdf', 'dataset\\satisfecho\\Satisfecho-u2-5.bdf', 'dataset\\satisfecho\\Satisfecho-u7-7.bdf', 'dataset\\insatisfecho\\Insatisfecho-u11-3.bdf', 'dataset\\satisfecho\\Satisfecho-u7-5.bdf', 'dataset\\insatisfecho\\Insatisfecho-u7-2.bdf']
ncanales=['EEG 1', 'EEG 2','EEG 3','EEG 4', 'EEG 5','EEG 6','EEG 7', 'EEG 8','EEG 9','EEG 10']
noptimi="RMSprop"
narquitec="LeNet"
cdestino="CambioSemilla30P"
fromModel=cdestino
epochs=2
bs=16
seed=12
rangoI = 0
rangoF = 2

for i in range(rangoI,rangoF):
	trainer = training(path_to_dataset=dataset, 
		save_to_dir_model=model_dir, 
		lbl=lbldic, 
		bs=bs, 
		epochs=epochs, 
		lr=0.001, 
		seed=i, 
		numclasses=len(lbldic), 
		splitDataset=0.2,
		numberOfExperiment=i+1,# Se puede incrementar
		lowfrec=1,
		highpass=40,
		conaug=False,
		canales=ncanales,
		destino=cdestino,
		ordendata=ordendataset,
		arquitec=narquitec,
		optimi=noptimi)
	trainer.train()

# Se utiliza para optener la matrix de confucion de un modelo ya creado y guardado

for i in range(rangoI,rangoF):
	modeloh5='Ex'+str(i+1)+'model.h5'
	trainer = trainingMatriz(path_to_dataset=dataset, 
		save_to_dir_model=model_dir, 
		lbl=lbldic, 
		bs=bs, 
		epochs=epochs, 
		lr=0.001, 
		seed=i, 
		numclasses=len(lbldic), 
		splitDataset=0.2,
		numberOfExperiment=i+1,
		lowfrec=1,
		highpass=40,
		conaug=False,
		canales=ncanales,
		destino=cdestino,
		ordendata=ordendataset,
		arquitec=narquitec,
		optimi=noptimi,
		fromModel=fromModel,
		modeloh5=modeloh5)
	trainer.train()
# musicPath = glob.glob('Music/*')
# musicIndex = 0
# playsound.playsound(musicPath[musicIndex], True)