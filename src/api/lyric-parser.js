// [00:22.12]若这一束吊灯倾泻下来
const timeExp = /\[(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?\]/g;
const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

export default class Lyric {
    constructor(lyric, handler = () => {}) {
        this.lyric = lyric;
        this.lines = [];
        this.handler = handler;
        this.state = STATE_PAUSE;
        this.currLineIndex = 0; // 当前歌词的行数
        this.startStamp = 0;
        this.initLines();
    }

    initLines() {
        const lines = this.lyric.split('\n');
        for (let i=0; i<lines.length; i++) {
            const line = lines[i];
            let result = timeExp.exec(line);
            if (!result) continue;
            const txt = line.replace(timeExp, '').trim(); // 去掉歌词中的时间戳
            if (!txt) continue;
            if (result[3].length === 3) {
                result[3] = result[3] / 10;
            }
            this.lines.push({
                time: result[1] * 60 * 1000
                    + result[2] * 1000
                    + (result[3] || 0) * 10,
                txt
            });
        }
        this.lines.sort((a, b) => {
            return a.time - b.time
        });
    }

    play(offset=0, isSeek=false) {
        if (!this.lines.length) return;
        this.state = STATE_PLAYING;
        // 当前的行数
        this.currLineIndex = this.findCurrLineIndex(offset);
        this.callHandler(this.currLineIndex - 1);
        this.startStamp = Date.now() - offset;
        if (this.currLineIndex < this.lines.length) {
            clearTimeout(this.timer);
            this.playRest(isSeek);
        }
    }

    togglePlay(offset) {
        if (this.state === STATE_PLAYING) {
            this.stop();
        } else {
            this.state = STATE_PLAYING;
            this.play(offset, true);
        }
    }

    stop() {
        this.state = STATE_PAUSE;
        clearTimeout(this.timer);
    }

    seek(offset) {
        this.play(offset, true);
    }

    callHandler(i) {
        if (i < 0) return;
        this.handler({
            txt: this.lines[i].txt,
            lineNum: i
        })
    }

    playRest(isSeek = false) {
        let line = this.lines[this.currLineIndex];
        let delay;
        if (isSeek) {
            delay = line.time - (Date.now() - this.startStamp);
        } else {
            let preTime = this.lines[this.currLineIndex - 1]
                ? this.lines[this.currLineIndex - 1].time
                : 0;
            delay = line.time - preTime;
        }
        this.timer = setTimeout(() => {
            this.callHandler(this.currLineIndex);
            this.currLineIndex++;
            if (
                this.currLineIndex < this.lines.length &&
                this.state === STATE_PLAYING
            ) {
                this.playRest();
            }
        }, delay);
    }

    findCurrLineIndex(time) {
        return this.lines.findIndex(line => (
            line.time >= time
        ));
    }
}