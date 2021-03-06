import {obj as through} from 'through2';
import {headless, server, slimerjs, phantomjs, chrome} from './lib/headless';
import SpecRunner from './lib/spec_runner';

function specRunner({profile, sourcemappedStacktrace} = {}) {
  const specRunner = new SpecRunner({profile, sourcemappedStacktrace, path: '/specRunner.html'});
  const consoleRunner = new SpecRunner({console: true, path: '/consoleRunner.html'});
  return through(function(file, encoding, next) {
    this.push(file);
    this.push(specRunner.addFile(file.relative));
    this.push(consoleRunner.addFile(file.relative));
    next();
  });
}

export {headless, server, slimerjs, phantomjs, chrome, specRunner};