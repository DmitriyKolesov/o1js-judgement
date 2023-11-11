import {Field, state, State, Struct} from 'o1js';

export class Participant extends Struct {
    @state(Field) projectName = State<Field>();
    @state(Field) participantPublicKey = State<Field>();
    @state(Field) entryLink = State<Field>();
    @state(Field) estimation = State<Field>();
}