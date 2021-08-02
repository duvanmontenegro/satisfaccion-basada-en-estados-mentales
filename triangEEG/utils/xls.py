import pandas as pd
import pickle
import os
# def crearxls(model,conaug,numberClasses,numberOfExperiment,parameterOfMoficate,datasetName,modelName,nameFile,experimentPath,hyperparameter,H,destino):
def crearxls(model,conaug,bdfPaths,numberClasses,numberOfExperiment,parameterOfMoficate,datasetName,modelName,nameFile,experimentPath,hyperparameter,H,destino):
	if(conaug):
		modelPath = experimentPath + '/aug' + nameFile + '.model'
		plotPath = experimentPath + '/aug' + nameFile
	else:
		modelPath = experimentPath + '/' + nameFile + '.model'
		plotPath = experimentPath + '/' + nameFile
	# bdfPaths=str(bdfPaths)
	# model.save(modelPath, include_optimizer=False)

	# with open(plotPath + '.pkl', 'wb') as f:
	# 	pickle.dump(H.history, f, pickle.HIGHEST_PROTOCOL)

	# os.system("cd Results/results/")
	# os.system("mkdir "+destino)

	if(conaug):
		rutaexc='Results/results/'+destino+'/excels/Ex'+str(numberOfExperiment)+'augresults.xlsx'
		df2 = pd.DataFrame(hyperparameter, columns = ['id', 'name_file','dataset_name','lowfrec','highpass','aug','BS','EPOCHS','INIT_LR','Class number','modelName','Seed' ,'shear_range','orden Data','orden ingreso Data','canales','loss_val','lower_loss_val','accuracy_val','biggest_accuracy_val','loss_train','lower_loss_train','accuracy_train','biggest_accuracy_train','destino'])
		df2.to_excel(rutaexc, sheet_name='results')
	else:
		rutaexc='Results/results/'+destino+'/excels/Ex'+str(numberOfExperiment)+'results.xlsx'
		df2 = pd.DataFrame(hyperparameter, columns = ['id', 'name_file','dataset_name','lowfrec','highpass','aug','BS','EPOCHS','INIT_LR','Class number','modelName','Seed' ,'shear_range','orden Data','orden ingreso Data','canales','loss_val','lower_loss_val','accuracy_val','biggest_accuracy_val','loss_train','lower_loss_train','accuracy_train','biggest_accuracy_train','destino'])
		df2.to_excel(rutaexc, sheet_name='results')