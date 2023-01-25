import path from "path"
import fs from "fs"
import * as glob from "glob"

function mkdirp(filePath) {
    path.dirname(filePath).split(/[\/|\\]/).reduce((prev, current) => {
        prev += current + '/';
        if (!fs.existsSync(prev)) {
            fs.mkdirSync(prev);
        }
        return prev;
    }, '');
    return filePath;
}

export function cp(srcDir, pattern, destDir, destAsIs = false) {
    return {
        name: 'copy-files',
        generateBundle() {
            glob.sync(srcDir + '/' + pattern, { nodir: true }).forEach(filePath => {
                fs.writeFileSync(
                    destAsIs ? destDir : mkdirp(destDir + '/' + path.relative(srcDir, filePath)),
                    fs.readFileSync(filePath)
                );
            });
        }
    }
}
