export class AudioData {
    filename: string;
    overall_tempo: number;
    peak_1: number;
    peak_2: number;

    constructor(data: any) {
        if (data) {
            this.filename = data.filename;
            this.overall_tempo = data.overall_tempo;
            this.peak_1 = data.peak_1;
            this.peak_2 = data.peak_2;
        }
        else {
            this.filename = '';
            this.overall_tempo = 0;
            this.peak_1 = 0;
            this.peak_2 = 0;
        }
    }
}
