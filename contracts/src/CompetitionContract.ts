import {Field, SmartContract, state, State, method, Provable} from 'o1js';
import { Participant } from './Participant';

class CompetitionStage {
    constructor(stages) {
        this.stages = stages;
    }
 stages:'submission' | 'judging' | 'complete';
}

export class CompetitionContract extends SmartContract {
    @state(Field) nextCompetitionId = State.init(Field(0));
    @state(Field) competitionName = State<Field>();
    @state(Field) competitionStage = State<Field>();
    @state(Provable.Array) judgesList = State<Provable.Array<string>>();
    @state(Provable.Array) judgingCriteriaList = State<Provable.Array<string>>();
    @state(EncryptionPublicKey) encryptionPublicKey =
        State<EncryptionPublicKey>();
    @state(Provable.Array) participantsList = State<Provable.Array<Participant>>();

    @method async createCompetition(competitionName, judgesList: Provable.Array<string>, judgingCriteriaList: Provable.Array<string>) {
        let currentId = await this.nextCompetitionId.get();
        this.nextCompetitionId.assertEquals(currentId);
        let newId = currentId.add(Field(1));

        // Сохраняем информацию о конкурсе
        this.competitionName.set(competitionName);
        this.judgesList.set(judgesList);
        this.judgingCriteriaList.set(judgingCriteriaList);

        this.nextCompetitionId.set(newId);

        return newId;
    }

  // Метод для регистрации заявки
  @method async submitEntry(competitionId, projectName, participantPublicKey, entryLink) {
    // Проверка, что конкурс с таким ID существует прием заявок открыт
      const competitionExist = await this.nextCompetitionId.get();
      if (competitionExist.isEmpty || competitionId.isNull()) {
          throw new Error(`The competition doesn't exist`);
      }
    const competitionStage = await this.competitionStage.get();
    if (competitionStage.equals(CompetitionStage.stages === 'submission')) {
      throw new Error('Submission is closed');
    }
      //
      const participant: Participant = {projectName: projectName, participantPublicKey:participantPublicKey, entryLink:entryLink};
      this.participantsList = [...this.participantsList, participant];
      this.participantsList.set(this.participantsList);
  }

  // Метод для оценки заявки судьей
  @method async judgeEntry(judgePublicKey, participantPublicKey, scores: Array<number>) {
      if (!this.judgesList.get().includes(judgePublicKey)) {
          throw new Error(`You are not authorized to judge`);
      }
      let sum = 0;
      let totalScore: number;

      for (let number of scores) {
          sum += number;
      }

      totalScore = scores.length > 0 ? sum / scores.length : 0;
      const list = this.participantsList.get();
      const participantIndex = list.findIndex((element, index) =>
          element.publicKey === participantPublicKey
      )
      list[participantIndex] = { ...list[participantIndex] , newField: totalScore }
      this.participantsList.set(list);

  }

    @method async setJudgingStage() {
        if () {
            throw new Error(`You are not authorized to judge`);
        }

    }

  // Другие методы, например, для закрытия приема заявок и завершения конкурса, могут быть добавлены аналогично
}
