
// fetch() es el método standard global de JS para realizar pertinciones HTTP,
// requiere una URL y devuelve una promesa y su resolución en un objeto Response

/**
 * Realiza petición fetch tipo Get
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async () => {
    // espera la resolución de la promesa retornada del fetch(),
    // el objeto Response (body:, header:, status:, etc)
    const res = await fetch( 'https://api.breakingbadquotes.xyz/v1/quotes' );

    // .json() extrae el body del objeto Reponse y lo retorna como Promise que resuelve en un objeto JS,
    // await espera la resolución de la promesa, obteniendo un arreglo de objetos
    const data = await res.json();
    console.log(data[0]);
    
    // retorna solo el `primer elemento del arreglo
    return data[0];
    
};


/**
 * 
 * @param {HTLMDivElement} element 
 */
export const BreakingbadApp = async( element ) => {

    // renderizan título y loading...
    document.querySelector('#app-title').innerHTML = 'Breaquingbad App';
    element.innerHTML = 'Loading...';

    // espera la resolució de la promise que devuelve la func fetchQuote()
    // await fetchQuote();

    //crear elementos html
    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';

    // func que recibe la data, la inserta en los elementos html y
    // lo renderiza todo en el elemento html recibido en (element)
    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        //renderiza elementos html como hijos del elemento html recibido en (element)
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );
    };
    
    // listener al botón nextQuoteButton
    nextQuoteButton.addEventListener('click', async() =>{
        //muestra el Loading en el element
        element.replaceChildren( 'Loading...' );
        //llama func que obtiene la data de la api, como promesa
        const data = await fetchQuote();
        // llama func que renderiza, enviando la data      
        renderQuote( data );
    });
    
    //llama func que obtiene la data de la api, como promesa
    fetchQuote()
        .then( data => renderQuote(data));


};