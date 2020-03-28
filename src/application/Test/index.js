import React, { useEffect, useCallback, useState } from 'react';

function Linco(props) {
    const { count, name } = props;
    const handleClick = useCallback(() => {
        console.log('count is ', count, ' and name is ', name);
    }, [count]);

    return (
        <>
            <button onClick={handleClick}>click me</button>
        </>
    )
}

function Test() {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count+1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleClick}>click</button>
            <hr/>
            <Linco name={'plearner'} count={count} />
        </div>
    )
}

export default Test;