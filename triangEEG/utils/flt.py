import mne

def filters(raw,eeg_picks,lowfrec,highpass):
    #filtro pasabanda
    # lowfrec=1
    # highpass=45
    # raw_highpass = raw.copy.filter(l_freq=lowfrec, h_freq=highpass)
    raw_highpass = raw.filter(l_freq=lowfrec, h_freq=highpass)
    #raw_highpass.plot()
    #Imprime plano frecuencia
    #raw_highpass.plot_psd(picks=eeg_picks)
    #filtro ruido electrico
    freqs = (60)
    raw_notch_fit = raw_highpass.notch_filter(freqs=freqs, picks=eeg_picks, method='spectrum_fit', filter_length='12s')
    #raw_highpass.plot()
    #Imprime plano frecuencia
    #raw_notch_fit.plot_psd(picks=eeg_picks)
    return raw_notch_fit