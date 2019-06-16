import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {VacabularyService} from './vacabularyService';

export enum ChallengeStatus {
    new,
    failed,
    success
}

@Injectable()
export class ChallengeService {
    public letter: BehaviorSubject<string> = new BehaviorSubject<string>("a");
    public word: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public status: BehaviorSubject<ChallengeStatus> = new BehaviorSubject<ChallengeStatus>(ChallengeStatus.new);
    public t = 'a';
    constructor(private vacabularyService: VacabularyService) {

    }

    public newChallenge(letter: string): void {
        this.status.next(ChallengeStatus.new);
        this.setLetter(letter);
        const word = this.vacabularyService.getRandomWord(letter);
        this.setWord(word);
    }

    private setWord(word: string): void {
        this.word.next(word);
    }

    private setLetter(letter: string): void {
        this.letter.next(letter);
    }

    public makeChoice(index: number, letter: string): void {

        if (this.status.getValue() !== ChallengeStatus.new) {
            return
        };

        const word= this.word.getValue();
        const result = word[index] === letter ? ChallengeStatus.success : ChallengeStatus.failed;
        this.status.next(result)
    }
}
