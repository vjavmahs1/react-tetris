import React, {useState} from 'react'

import { createStage, checkCollision } from '../gameHelper';


//Styled Component
import {StyledTetrisWrapper, StyledTetirs} from './styles/StyledTetris'

import {usePlayer} from '../hooks/usePlayers';
import {useStage} from '../hooks/useStage';
import {useInterval} from '../hooks/useInterval';
import {useGameStatus} from '../hooks/useGameStatus';




//components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = ( ) => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    console.log('re-render');
    console.log(rowsCleared);
    

    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0})){
            updatePlayerPos({x: dir, y: 0});
        }
    }

    const startGame = () => {
        //Reset EveryThing
        setStage(createStage());
        resetPlayer();
        setDropTime(500);
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);

    }

    const drop = () => {
        if (rows > (level +1 )* 10) {
            setLevel(prev => prev +1);
            setDropTime(500 / (level +1) + 100);
        }
        if(!checkCollision(player, stage, {x: 0, y:1}))
        {
            updatePlayerPos({x:0, y:1, collided:false})
        } else {
            if(player.pos.y < 1) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
                
            }
            updatePlayerPos({x: 0, y:0, collided:true});
        }
    }

    const keyUp = ({keyCode}) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(500 / (level +1) + 100);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();

    }

    const move = ({ keyCode }) => {
        if(!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } 
            else if (keyCode === 39) {
                movePlayer(1);
            }
            else if (keyCode === 40) {
                dropPlayer();
            }else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }
    
    useInterval(( ) => {
        drop();
    }, dropTime)

    return (
        
        <StyledTetrisWrapper role="button" tabIndex ="0" onKeyDown={e => move(e)} onKeyUp={keyUp} >
            <StyledTetirs>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text= "Game Over" />
                ) : (
                    <div>
                    <Display text = {`Score: ${score}`} />
                    <Display text = {`Rows: ${rows}`}/>
                    <Display text = {`Level: ${level}`} />
                    </div>
                )}
                <StartButton callback={startGame}/>
            </aside>
            </StyledTetirs>
        </StyledTetrisWrapper>
    )

}

export default Tetris;