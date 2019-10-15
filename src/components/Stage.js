import React from 'react';
import Cell from './Cell'


const Stage = ({stage }) => (
    <div>
        {console.log(stage)
        }
        {stage.map(row => row.map((cell,x) => <Cell key={x} type={cell[0]} />))}
    </div>
)

export default Stage;