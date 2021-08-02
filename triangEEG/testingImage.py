import numpy as np
from Classification.Inference.inference import inference
import os

# # W
# sample = r"dataset\satisfecho\Satisfecho-u2-4.bdf"
sample = r"dataraw\Satisfecho-u13-1.bdf"
model_dir = r"model.h5"
nameclasses = ["insatisfecho","satisfecho"]
tester = inference(image=sample, 
	path_to_model=model_dir,
    classes=nameclasses)
tester.test()
# _DIRDBF_="dataraw"
# bdfs=os.listdir(_DIRDBF_)
# bdffull=None
# #recore todos los archivos dbf del directorio
# model_dir = r"model.h5"
# nameclasses = ["insatisfecho","satisfecho"]
# for bdf in bdfs:
# 	print("{}\{}".format(_DIRDBF_,bdf))
# 	sample = "{}\{}".format(_DIRDBF_,bdf)
# 	tester = inference(image=bdf, 
# 		path_to_model=model_dir,
# 	    classes=nameclasses)
# 	tester.test()
# 	print("{}\{}".format(_DIRDBF_,bdf))
