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
            <h2>Wartungsanleitung einer High-Z S-1000 T CNC Fräsmaschine</h2>
            <p>
                Im Folgenden werden die einzelnen Schritte der Wartung beschrieben. <br />
                Die Abkürzung CNC steht für „Computerized Numerical Control"
            </p>
          </div>
        </div>
      </section>

      <section className="two">
        <div className="container">
          <div className="hero">
            <h2>Vorbereitung</h2>
            <p>
              Als erstes ist es notwendig den Strom anzuschalten<br />
              und die Brücke nach ganz links zu fahren.<br />
              Danach mit einem Pinsel alle Holzspähne entfernen<br />
              und Handschuhe, ein Putztuch sowie Fett bereitlegen.
            </p>
          </div>
        </div>
      </section>

      <section className="three">
        <div className="container">
          <div className="hero">
            <h2>1. Schritt</h2>
            <p>
                Handschuhe anziehen und die Brücke in die Mitte fahren.<br />
                Rechts und links von der Spindel der x-Achse etwas Fett geben<br />
                und danach die Brücke nach links und rechts fahren.<br />
                Dadurch wird das alte Fett nach außen getrieben<br /> 
                und kann anschließend mit einem Lappen abgetragen werden.<br />
                Widerholen bis das ganze alte Fett abgetragen wurde.
            </p>
          </div>
        </div>
      </section>

      
      <section className="four">
          <div className="container">
              <div className="hero">
                  <h2>2. Schritt</h2>
                  <p>
                      Stirnseitig an der Maschine das Abdeckblech der Z-Achse entfernen.<br />
                      Dazu die drei Schrauben mit einem Imbusschlüssel ziehen.<br />
                      Die Abdeckung nach oben herausnehmen.<br />
                      Wartungsschritt 1 an der Z-Achse anwenden, <br />
                      wie zuvor an der X-Achse.<br />                 
                  </p>
              </div>
          </div>
      </section>

      
      <section className="five">
          <div className="container">
              <div className="hero">
                  <h2>3. Schritt</h2>
                  <p>
                      Nun auf die andere Siete der Z-Achse wechseln.<br />
                      Dort die Antriebsspindel der Z-Achse vor und hinter<br />
                      der Umlaufmutter einfetten, mit dem selben Prinzip<br />
                      wie zuvor schon bei den anderen beiden Achsen.
                  </p>
              </div>
          </div>
      </section>

      
      <section className="six">
          <div className="container">
              <div className="hero">
                  <h2>4. Schritt</h2>
                  <p>
                      Als nächstes die Motorlager der Schrittmotore abschmieren.<br />
                      Dafür die Z-Achse nach ganz unten fahren,<br />
                      dann ist der entsprechende Schmiernippel bereits zu sehen.<br />
                      Mit einer Fettpresse diese Stelle einfetten.
                  </p>
              </div>
          </div>
      </section>

      
      <section className="seven">
          <div className="container">
              <div className="hero">
                  <h2>5. Schritt</h2>
                  <p>
                      Alle Spindeln mit neuem Fett einfetten.<br />
                      Zum Schluss noch die Abdeckung der Z-Achse montieren.<br />
                      Dazu diese einfelden und verschrauben.<br />
                      Die Maschinen in all ihren Achsen verschieben, <br />
                      damit sich das Fett schön verteilt.
                  </p>
              </div>
          </div>
      </section>

      
      <section className="eight">
          <div className="container">
              <div className="hero">
                  <h1>Ende</h1>
              </div>
          </div>
      </section>
    </>
  );
}

export default App;
