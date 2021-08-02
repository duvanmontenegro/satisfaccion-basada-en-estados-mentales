##
import numpy as np
import mne
import os
import glob
def converttoDataFrame(raw,name):
    # raw=addAnnotation(raw,name)
    sampling_freq = raw.info['sfreq']
    start_end_secs = np.array([1, 12])
    start_sample, stop_sample = (start_end_secs * sampling_freq).astype(int)
    df = raw.to_data_frame(picks=['eeg'], start=start_sample, stop=stop_sample)
    df[['user']] = name
    df.drop(['user'], axis=1)
    print("")
    print(raw.to_data_frame(picks=['eeg'], start=start_sample, stop=stop_sample).head())

    df.to_csv(index=False)
    os.system("mkdir D:\Tesis\CNN\project\CSV\DataSetEdit")
    df.to_csv(r'D:\Tesis\CNN\project\CSV\DataSetEdit\export_dataframe'+name+'.csv', index = False, header=False)

    print("")
    print(df)
    print("")
    del(df['user'])
    print("")
    print(df)
    print("")

    return df


def converttoDataFrame2(raw,annotation):
    #Convierte anotaciones a eventos
    raw=addAnnotation(raw,annotation)

    (events,event_dict) = mne.events_from_annotations(raw, event_id=None)
    # raw=addAnnotation(raw,annotation)
    #print(events)
    event_dict = event_dict
    reject_criteria = dict(eeg=100e-6)       # 100 µV
    tmin, tmax = (-0.2, 0.5)  # epoch from 200 ms before event to 500 ms after it
    baseline = (None, 0)      # baseline period from start of epoch to time=0
    epochs = mne.Epochs(raw, events, event_dict, tmin=tmin, tmax=tmax, proj=True,
                        baseline=baseline, reject=reject_criteria, preload=True)
    return epochs.to_data_frame()

def addAnnotation(raw,annotation):
    #cubrir con la misma anotación toda el tiempo de la muestra
    my_annot = mne.Annotations(onset=[0,1],
                           duration=[1,12],
                           description=[annotation])
    return raw.set_annotations(my_annot)