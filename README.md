# Game of Life

This repo contains an approach to Conways Game of Life using React.

Conways Game of Life is an example of a cellular automaton. It is played on a two-dimensional grid of cells. Cells can either be dead or alive. The life state of each of the cells is calculated in iterations, considering last known state.

Cell life rules:

- if a cell is alive, and has 2 or 3 alive neighbors, it stays alive
- if a cell is alive, and has less than 2 or more than 3 alive neighbors, it dies
- if a cell is dead, and has exactly 3 alive neighbors, it springs to life
