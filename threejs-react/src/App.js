import React from 'react';
import Three from './components/Three';
import './css/style.css';
function App() {
  return (
    <>
      <Three />

      <section className="one">
        <div className="container">
          <div className="hero">
            <h2>Wartungsanleitung einer <br />
            High-Z S-1000 T CNC Fräsmaschine</h2>
            <p><br />
                In dieser Abbildung sind alle für die Wartung relevanten Bauteile beschriftet. <br />
                Basierend auf dieser Übersicht werden auf dieser Website die einzelnen Schritte der Wartung beschrieben. 
            </p>
          </div>
        </div>
      </section>

      <section className="two">
        <div className="container">
          <div className="hero">
            <h2>Vorbereitung</h2>
            <p><br />
              Als erstes ist es notwendig den Not-Aus Schalter herauszuziehen, <br />
              um den Strom anzuschalten und die Z-Achse nach ganz links zu fahren.<br />
              Anschließend alle Holzspäne mit einem Pinsel entfernen und Handschuhe, <br />
              ein Putztuch sowie eine Fettpresse bereitstellen.
            </p>
          </div>
        </div>
      </section>

      <section className="three">
        <div className="container">
          <div className="hero">
            <h2>1. Schritt</h2>
            <p><br />
                Handschuhe anziehen und die Brücke, welche sich auf der <br />
                Y-Achse befindet, in die Mitte fahren.<br />
                Rechts und links von der Spindel der X-Achse das Fett <br />
                mithilfe der Fettpresse hinzugeben und danach <br />
                die Brücke nach links und rechts fahren.<br />                
                Dadurch wird das alte Fett nach außen getrieben<br /> 
                und kann anschließend mit einem Lappen abgetragen werden.<br />
                Wiederholen bis das ganze alte Fett abgetragen wurde.
            </p>
          </div>
        </div>
      </section>

      
      <section className="four">
          <div className="container">
              <div className="hero">
                  <h2>2. Schritt</h2>
                  <p><br />
                      Als nächstes an der Maschine das Abdeckblech der Brücke entfernen.<br />
                      Dazu die zwei Schrauben mit einem Inbusschlüssel herausschrauben.<br />
                      Die Abdeckung nach oben herausnehmen.<br />
                      Wartungsschritt 1 an der Spindel der Y-Achse anwenden, <br />
                      wie zuvor an der Spindel der X-Achse.<br />                 
                  </p>
              </div>
          </div>
      </section>

      
      <section className="five">
          <div className="container">
              <div className="hero">
                  <h2>3. Schritt</h2>
                  <p><br />
                      Nun auf die andere Seite der Fräse wechseln. <br />
                      Dort die Spindel der Z-Achse einfetten,<br />
                      mit dem selben Prinzip wie zuvor bei den anderen beiden Spindeln.
                  </p>
              </div>
          </div>
      </section>

      
      <section className="six">
          <div className="container">
              <div className="hero">
                  <h2>4. Schritt</h2>
                  <p><br />
                      Als nächstes die Motorlager der Schrittmotoren abschmieren.<br />                      
                      Dazu den entsprechenden Schmiernippel mit einer Fettpresse einfetten.
                  </p>
              </div>
          </div>
      </section>

      
      <section className="seven">
          <div className="container">
              <div className="hero">
                  <h2>5. Schritt</h2>
                  <p><br />
                      Alle von altem Fett befreiten Spindeln mit neuem Fett einfetten.<br />                      
                      Die Maschine in all ihren Achsen verfahren, damit sich das Fett verteilt.<br />
                      Zum Schluss noch die Abdeckung der Brücke montieren.
                  </p>
              </div>
          </div>
      </section>

      
      <section className="eight">
          <div className="container">
              <div className="hero">
                  <h1>Geschafft :)</h1>
              </div>
          </div>
      </section>
    </>
  );
}

export default App;
