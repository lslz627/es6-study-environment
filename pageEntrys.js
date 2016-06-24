import glob from 'glob';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var pageEntrys = function (entrys, extractHtmlWebpackPlugin) {
  entrys = entrys || {};
  extractHtmlWebpackPlugin = extractHtmlWebpackPlugin || [];

  glob.sync(__dirname + '/src/views/**/*.html').forEach((name) => {
    var parse = path.parse(name);
    entrys[parse.name] = [parse.dir + '/js/' + parse.name + '.js'];
    var plugin = new HtmlWebpackPlugin({
      template: name,
      filename: 'view/' + parse.base,
      chunks: ['common', parse.name]
    });
    extractHtmlWebpackPlugin.push(plugin);
  });

  glob.sync(__dirname + '/src/views/*.html').forEach((name) => {
    var parse = path.parse(name);
    entrys[parse.name] = [parse.dir + '/js/' + parse.name + '.js'];
    var plugin = new HtmlWebpackPlugin({
      template: name,
      filename: 'view/' + parse.base,
      chunks: ['common', parse.name]
    });
    extractHtmlWebpackPlugin.push(plugin);
  });

  glob.sync(__dirname + '/src/*.html').forEach((name) => {
    var parse = path.parse(name);
    entrys[parse.name] = [parse.dir + '/js/' + parse.name + '.js'];
    var plugin = new HtmlWebpackPlugin({
      template: name,
      filename: parse.base,
      chunks: ['common', parse.name]
    });
    extractHtmlWebpackPlugin.push(plugin);
  });

  return entrys;
};

export default pageEntrys;
