# gzpt-unlock
Gazed Based Authentication System using Gazepoint

This repository is a combination of 3 main parts:
* [1 Gaze Machine Server](#gaze-machine-server)
* [1 Processing Server](#processing-server)
* [1 Frontend using React and Electron and 1 deprecated version using TKinter](#frontend)

### Gaze Machine Server
Gaze Machine Server is the part that reads raw data from gaze machine and does some preprocessing work. It will only sends valid user's fixation positions to processing Server.

Further detailed workflow and information about Gaze Machine Server, please see [here](https://github.com/bryan-hz/gzpt-unlock/tree/master/gzserver).

### Processing Server
Processing Server works similar to a _Finite State Machine_, and each _stage_ is a _state_ node. It takes inputs from Gaze Machine Server and determines next stage, however, it won't actually update until its stage information being read.

Further detailed workflow and information about Processing Server, please see [here](https://github.com/bryan-hz/gzpt-unlock/tree/master/processor).

### Frontend
Different from tranditional Frontend, there is no place for users to _input_ from the frontend side. It is only for displaying current stage information (from Processing Server) and guiding users for further inputs.

Further detailed workflow and information about Frontend, please see [here](https://github.com/bryan-hz/gzpt-unlock/tree/master/ui2.0)

(deprecated version [here](https://github.com/bryan-hz/gzpt-unlock/tree/master/ui))
