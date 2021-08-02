from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.layers import AveragePooling2D
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import Activation
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import BatchNormalization
from tensorflow.keras.layers import MaxPool2D
from tensorflow.keras import backend as K

class LeNet:
	@staticmethod
	def build(width, height, depth, classes):
		# initialize the model
		k=3
		model = Sequential()
		inputShape = (height, width, depth)
		# if we are using "channels first", update the input shape
		if K.image_data_format() == "channels_first":
			inputShape = (depth, height, width)
		# first set of CONV => RELU => POOL layers
		model.add(Conv2D(6, (k, k), padding="same", input_shape=inputShape))
		model.add(Activation("relu"))
		model.add(AveragePooling2D())
		# model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))	
		model.add(Dropout(.25))
		# second set of CONV => RELU => POOL layers
		model.add(Conv2D(16, (k, k), padding="same"))
		model.add(Activation("relu"))
		model.add(AveragePooling2D())
		# model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
		model.add(Dropout(.25))
		# first (and only) set of FC => RELU layers
		# Third set of CONV => RELU => POOL layers
		model.add(Conv2D(32, (k, k), padding="same"))
		model.add(Activation("relu"))
		#model.add(AveragePooling2D())
		model.add(AveragePooling2D(pool_size=(2, 2), strides=None, padding='same', data_format=None))
		# model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
		# Four set of CONV => RELU => POOL layers
		model.add(Conv2D(64, (k, k), padding="same"))
		model.add(Activation("relu"))
		model.add(AveragePooling2D(padding='same'))
		# model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
		model.add(Dropout(.25))
		# first (and only) set of FC => RELU layers
		model.add(Flatten())
		model.add(Dense(units=120, activation='relu'))
		model.add(Dropout(.4))
		model.add(Dense(units=84, activation='relu'))
		model.add(Dropout(.4))
		# softmax classifier
		model.add(Dense(classes))
		model.add(Activation("softmax"))
		# return the constructed network architecture
		return model
class AlexNet:
	@staticmethod
	def build(width, height, depth, classes):	
		model = Sequential()
		inputShape = (height, width, depth)
		# if we are using "channels first", update the input shape
		if K.image_data_format() == "channels_first":
			inputShape = (depth, height, width)

		model.add(Conv2D(filters=96, kernel_size=(11,11), strides=(4,4), activation='relu', padding="same", input_shape=inputShape))
		model.add(BatchNormalization())
		# model.add(MaxPooling2D((2, 2)))
		# model.add(MaxPool2D(pool_size=(3,3), strides=(2,2)))
		# model.add(MaxPool2D(pool_size=(3,3), input_shape=inputShape))
		model.add(Dropout(.25))

		model.add(Conv2D(filters=256, kernel_size=(5,5), strides=(1,1), activation='relu', padding="same"))
		model.add(BatchNormalization())
		# model.add(MaxPooling2D((2, 2)))
		# model.add(MaxPool2D(pool_size=(3,3), strides=(2,2)))
		# model.add(MaxPool2D(pool_size=(3,3), input_shape=inputShape))
		model.add(Dropout(.25))

		model.add(Conv2D(filters=384, kernel_size=(3,3), strides=(1,1), activation='relu', padding="same"))
		model.add(BatchNormalization())
		model.add(Conv2D(filters=384, kernel_size=(1,1), strides=(1,1), activation='relu', padding="same"))
		model.add(BatchNormalization())
		model.add(Conv2D(filters=256, kernel_size=(1,1), strides=(1,1), activation='relu', padding="same"))
		model.add(BatchNormalization())
		# model.add(MaxPooling2D((2, 2)))
		# model.add(MaxPool2D(pool_size=(3,3), strides=(2,2)))	
		# model.add(MaxPool2D(pool_size=(3,3), input_shape=inputShape))
		model.add(Dropout(.25))
		
		model.add(Flatten())
		model.add(Dense(units=64, activation='relu'))
		model.add(Dropout(0.5))
		model.add(Dense(units=64, activation='relu'))
		model.add(Dropout(0.5))
		model.add(Dense(classes, activation='softmax'))
		return model
class RandomF:
	@staticmethod
	def build(width, height, depth, classes):
		model = Sequential()
		inputShape = (height, width, depth)
		print(height, width, depth)
		# if we are using "channels first", update the input shape
		if K.image_data_format() == "channels_first":
			inputShape = (depth, height, width)
		model.add(Dense(10, activation='sigmoid', input_shape=(height,)))
		model.add(Dense(10, activation='softmax'))
		# model.add(Dense(input_shape=(height),activation="relu"))
		# model.add(Dense(1024))
		# model.add(Activation('relu'))
		# model.add(Dropout(0.25))
		# model.add(Dense(512))
		# model.add(Activation('relu'))
		# model.add(Dropout(0.25))
		# model.add(Dense(128))
		# model.add(Activation('relu'))
		# model.add(Dropout(0.25))
		# model.add(Dense(64))
		# model.add(Activation('relu'))
		# model.add(Dropout(0.25))
		# model.add(Dense(32))
		# model.add(Activation('relu'))
		# model.add(Dropout(0.25))
		# model.add(Dense(classes))
		return model
