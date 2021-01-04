#print("Hello world")
from tkinter import *
import pyaudio
import sys
import matplotlib.pyplot as plt
import time
import numpy as np


class aplicacion():
    def __init__(self):
        self.raiz = Tk()
        self.raiz.geometry('1366x768')
        self.raiz.resizable(width=False,height=False)
        self.raiz.title('Captura mic')
        
        
        self.bottonCapture = Button(self.raiz, text='Empezar a capturar el mic', command=self.capturar)
        self.bottonCapture.place(x=10,y=10)
        self.bottonCapture.focus_set()

        self.cuadro = Canvas(self.raiz, width=955, height=200, bg="black")
        self.cuadro.place(x=10,y=50)

        self.texto = Text(self.raiz, bg="darkgrey", fg="black", height=20, width=119)
        self.texto.place(x=10,y=260)

        self.raiz.mainloop()

    def capturar(self):
        print("probando")
        CHUNK = 1024
        FORMAT = pyaudio.paInt8
        CHANNELS = 1
        RATE = 22050
        duracion = 10
        #T = 1/rate

        p = pyaudio.PyAudio()

        stream = p.open(format=FORMAT,
                        channels=CHANNELS,rate=RATE,
                        input=True,
                        frames_per_buffer=CHUNK)

        stream.start_stream()
        frames=[]

        try:
            valorAnteriorY=0
            valorAnteriorX=0
            while True:
                data=stream.read(CHUNK, exception_on_overflow = False)
                frames.append(data)

                self.cuadro.delete("all")

                for _ in data:

                    self.cuadro.create_line(valorAnteriorX, valorAnteriorY, valorAnteriorX+1, int(_/2)+50, fill="green")


                    valorAnteriorX+=1
                    valorAnteriorY=int(_/2)+50

                time.sleep(3)
                valorAnteriorY=0
                valorAnteriorX=0

                self.texto.delete(1.0, END)
                self.texto.insert(END,data)
                
                #print("empieza dato " + str(data[0]) + "termina dato\n")



                self.raiz.update()
                
        except KeyboardInterrupt:
            pass

        print("\r\nSaliendo...")

        #for i in range(0, int(RATE / CHUNK * duracion)):
        #    data = stream.read(CHUNK)
        #    frames.append(data)
        #frames = ''.join(frames)

        
        #amplitude = numpy.fromstring(frames, numpy.int16)
        #print(amplitude)

        

        #for _ in frames:
        #    print(len(_)) 

        #print(len(frames))

        #for _ in frames[0]:
        #    print(_)
        
        '''try:
            
            while True:
                valorAnteriorY=0
                valorAnteriorX=0
                #data=stream.read(CHUNK, exception_on_overflow = False)
                #frames.append(data)
                amplitud = np.frombuffer(stream.read(CHUNK), np.int16)
                self.cuadro.delete("all")

                for _ in amplitud:

                    self.cuadro.create_line(valorAnteriorX, valorAnteriorY, valorAnteriorX+1, int(_/100)+100, fill="green")

                    print (int(_/1000))

                    valorAnteriorX+=1
                    valorAnteriorY=int(_/100)+100

                time.sleep(0.5)
                #time.sleep(3)
                #valorAnteriorY=0
                #valorAnteriorX=0

                self.texto.delete(1.0, END)
                self.texto.insert(END,amplitud)
                
                #print("empieza dato " + str(data[0]) + "termina dato\n")



                self.raiz.update()
                
        except Exception as e:
            print("error")
            print(str(valorAnteriorX) + " " + str(valorAnteriorY))
            

        except KeyboardInterrupt:
            pass

        print("\r\nSaliendo...")'''




        

        stream.stop_stream()
        stream.close()

        p.terminate()


def main():
    miApp = aplicacion()
    return 0



'''CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
duracion = 10
#T = 1/rate

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                   channels=CHANNELS,rate=RATE,
                   input=True,
                   frames_per_buffer=CHUNK)


frames=[]

try:
    while True:
        data=stream.read(100)
        frames.append(data)
        
except KeyboardInterrupt:
    pass

print("\r\nSaliendo...")

for _ in frames:
    print(_) 




stream.stop_stream()
stream.close()

p.terminate()'''



if __name__ == '__main__':
    main()