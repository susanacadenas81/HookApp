import React from 'react';
import '../02-useEffect/effects.css';
import { useFetch } from '../../hooks/useFetch';
import { useCounter } from '../../hooks/useCounter';

export const MultipleCustomHooks = () => {

    const { counter, increment } = useCounter(1);
    console.log(counter)
    const { loading, data } = useFetch(  `https://www.breakingbadapi.com/api/quotes/${counter}` );
    const { author, quote } = !!data && data[0];


    return (
        <div>
            <h1>BreakingBad Quotes</h1>
            <hr />

            {
                loading 
                ?
                    (
                    <div className="alert alert-info text-center">
                    Loading...
                    </div>
                    ) :
                    (
                        <blockquote className="blockquote text-right">
                        <p> { quote } </p>
                        <footer className="blockquote-footer"> { author } </footer>
                        </blockquote>
                    )
            }

            <button onClick={ increment } className="btn btn-primary">
                Siguiente frase
            </button>
            

            
        </div>
    )
}
