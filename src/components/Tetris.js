import React from 'react'

import {createStage} from '../gameHelper'
import {StyledTetrisWrapper, StyledTetirs} from './styles/StyledTetris'

//components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = ( ) => {


    return (
        <StyledTetrisWrapper>
            <StyledTetirs>
            <Stage stage={createStage()} />
            <aside>
                <div>
                <Display text = "Score" />
                <Display text = "Rows" />
                <Display text = "Level" />
                </div>
                <StartButton />
            </aside>
            </StyledTetirs>
        </StyledTetrisWrapper>
    )

}

export default Tetris;