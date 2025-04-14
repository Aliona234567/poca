import React, { useState } from 'react';

const Categoris = ({ chooseCategory }) => {
    const [categoris] = useState([
        {
            key: 'all',
            name:'Все',
        },
        {
            key: 'milky',
            name:'Шоколад молочный ',
        },
        {
            key: 'assorted',
            name:'Шоколад ассорти',
        },
        {
            key: 'dragees',
            name:'Драже',
        },
        {
            key: 'candies',
            name:'Конфеты',
        }
    ]);

    return (
        <div className='categoris'>
            {categoris.map(el => (
                <div key={el.key} onClick={() => chooseCategory(el.key)}>
                    {el.name}
                </div>
            ))}
        </div>
    );
};

export default Categoris;