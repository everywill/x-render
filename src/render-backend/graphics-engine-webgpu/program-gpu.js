import { Program } from "../graphics-engine/program";

class ProgramGPU extends Program {
    constructor(renderDevice, programDesc) {
        super(renderDevice, programDesc);
    }
}

export {
    ProgramGPU,
}
