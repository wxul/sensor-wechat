const fs = require('fs');
const path = require('path');

const fm_path = path.resolve(__dirname, '../../config/fm.json');

module.exports = {
    getFM() {
        if (fs.existsSync(fm_path)) {
            return JSON.parse(fs.readFileSync(fm_path));
        } else {
            var arr = [];
            fs.writeFileSync(fm_path, JSON.stringify(arr));
            return arr;
        }
    },
    checkName(name) {
        var fm = this.getFM();
        return fm_path.findIndex(e => e.name == name);
    },
    setFM(name, url, type) {
        if (this.checkName(name) >= 0) return;
        var fm = this.getFM();
        fm.push({ name, url, type });
        fs.writeFileSync(fm_path, JSON.stringify(fm));
    },
    delFM(name) {
        var i = this.checkName(name);
        if (i === -1) return;
        var fm = this.getFM();
        fm.splice(i, 1);
        fs.writeFileSync(fm_path, JSON.stringify(fm));
    },
    format() {
        var str = '喜马拉雅电台:\r\n';
        var fm = this.getFM();
        fm.forEach((f, i) => {
            str += `<a href="${f.url}">${i + 1}:${f.name}</a>\r\n`;
        });
        return str;
    }
};
