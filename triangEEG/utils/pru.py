import os
from paths import list_excels
import pandas as pd

os.system("dir")
destino="AlexNet1" 
numberOfExperiment=5
dataset='Results/results/'+destino+'/excels'
dataset='Results/results'
print(list(list_excels(dataset)))
dataset=list(list_excels(dataset))
hyperparameter={
	'id':[numberOfExperiment],
}
if(dataset==[]):
	print("Entro")
	# if(conaug):
	if(True):
		rutaexc='Results/results/'+destino+'/excels/Ex'+str(numberOfExperiment)+'pruee.xlsx'
		# rutaexc='Results/results/prue.xlsx'
		df2 = pd.DataFrame(hyperparameter, columns = ['id'])
		# df2 = pd.DataFrame(hyperparameter, columns = ['id', 'name_file','dataset_name','lowfrec','highpass','aug','BS','EPOCHS','INIT_LR','Class number','modelName','Seed' ,'shear_range','orden Data','orden ingreso Data','canales','loss_val','lower_loss_val','accuracy_val','biggest_accuracy_val','loss_train','lower_loss_train','accuracy_train','biggest_accuracy_train','destino'])
		df2.to_excel(rutaexc, sheet_name='results')
	else:
		rutaexc='Results/results/'+destino+'/excels/Ex'+str(numberOfExperiment)+'results.xlsx'
		df2 = pd.DataFrame(hyperparameter, columns = ['id', 'name_file','dataset_name','lowfrec','highpass','aug','BS','EPOCHS','INIT_LR','Class number','modelName','Seed' ,'shear_range','orden Data','orden ingreso Data','canales','loss_val','lower_loss_val','accuracy_val','biggest_accuracy_val','loss_train','lower_loss_train','accuracy_train','biggest_accuracy_train','destino'])
		df2.to_excel(rutaexc, sheet_name='results')