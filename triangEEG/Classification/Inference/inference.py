from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import mne
from utils.flt import filters
from utils.c2df import converttoDataFrame, addAnnotation
np.seterr(divide='ignore', invalid='ignore')

def readBdf(path,label):
    raw = mne.io.read_raw_bdf(path, preload=True)
    raw_selection = raw.copy().crop(tmin=2, tmax=12) # cambiar a 13 cuando midamos 15 segundos 
    raw_selection.pick_channels(['EEG 1', 'EEG 2','EEG 3','EEG 4', 'EEG 5','EEG 6','EEG 7', 'EEG 8','EEG 9'])
    eeg_picks = mne.pick_types(raw_selection.info, eeg=True)
    raw_filtered=filters(raw_selection,eeg_picks)
    df=converttoDataFrame(raw_filtered,int(label))
    return df

class inference(object):
	def __init__(self, image, path_to_model, classes):
		self.image = image
		self.path_to_model = path_to_model
		self.classes = classes

	def test(self):
		df=readBdf(self.image,"1")
		sample = df.to_numpy()
		sample=np.delete(sample, 1, axis=1)
		height = sample.shape[0]
		width = sample.shape[1]
		model = load_model(self.path_to_model, compile=False)
		sample = img_to_array(sample)
		sample = np.expand_dims(sample, axis=0)
		prediction = model.predict(sample)[0]
		print(prediction)
		value_predicted = self.classes[np.argmax(prediction)]
		print(value_predicted)