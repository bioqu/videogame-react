Video Game React
Video Game es una aplicación web que permite a los usuarios explorar y buscar videojuegos utilizando datos de la API de RAWG. La aplicación incluye funcionalidades como búsqueda, filtrado por género, plataforma, año, etiquetas (tags) y desarrolladores, así como un modo oscuro/claro para mejorar la experiencia del usuario.

La aplicación esta todavia en desarrrollo, por lo que espero que tengan paciencia.

Características Principales
Búsqueda de Juegos: Los usuarios pueden buscar juegos por nombre.

Filtrado Avanzado: Filtra juegos por género, plataforma, año de lanzamiento, etiquetas y desarrolladores.

Modo Oscuro/Claro: La aplicación incluye un interruptor para cambiar entre temas claros y oscuros.

Detalles del Juego: Muestra información detallada sobre cada juego, incluyendo su descripción, calificaciones y más.

Tecnologías Utilizadas
Librerías Externas
React:

Justificación: React es una librería de JavaScript ampliamente utilizada para construir interfaces de usuario interactivas y reutilizables. Su enfoque basado en componentes permite un desarrollo modular y escalable.

Uso en la Aplicación: La aplicación está construida completamente con React, utilizando componentes funcionales y hooks como useState, useEffect y useContext.

React Router:

Justificación: React Router es una librería esencial para manejar la navegación en aplicaciones de una sola página (SPA). Permite definir rutas y renderizar componentes específicos según la URL.

Uso en la Aplicación: Se utiliza para gestionar las rutas de la aplicación, como la página de inicio (/) y la página de detalles del juego (/game/:id).

Bootstrap:

Justificación: Bootstrap es un framework de CSS que proporciona componentes predefinidos y estilos responsivos. Facilita la creación de interfaces modernas y adaptables sin necesidad de escribir CSS desde cero.

Uso en la Aplicación: Se utiliza para estilizar la barra de navegación, los botones, los menús desplegables y otros componentes de la interfaz. Además, se aprovecha su sistema de grid para organizar el contenido de manera responsiva.

Axios:

Justificación: Axios es una librería para realizar solicitudes HTTP. Es más fácil de usar y más potente que la API nativa fetch de JavaScript.

Uso en la Aplicación: Se utiliza para realizar solicitudes a la API de RAWG y obtener datos de juegos, etiquetas y desarrolladores.

Context API (React):

Justificación: La Context API de React es una forma eficiente de compartir estados globales entre componentes sin necesidad de pasar props manualmente.

Uso en la Aplicación: Se utiliza para gestionar el tema de la aplicación (modo oscuro/claro) y compartir este estado entre todos los componentes.

API Externa
RAWG API:

Justificación: RAWG es una de las bases de datos más completas de videojuegos, con información detallada sobre títulos, géneros, plataformas, desarrolladores y más.

Uso en la Aplicación: Se utiliza para obtener datos de juegos, filtrarlos y mostrar detalles específicos.
