'use strict';
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const globBase = require('glob-base');

/**
 * Utilities
 * @type {object}
 */
const Util = {
    /**
     * Get filepath by glob pattern string
     * @param pattern{string} glob pattern string
     * @returns {stringp[]}
     */
    getPath(pattern) {
        return glob.sync(pattern);
    },
    /**
     * Get config file path (local or global)
     * @returns {string}
     */
    getLocalConfig() {
        let script = path.join(process.cwd(), 'frp.config.js');
        try {
            if (fs.statSync(script).isFile()) {
                return script;
            }
        } catch (e) {
        }
        return path.join(__dirname, '../frp.config.js');
    },
    /**
     * Get script file path (local or global)
     * @returns {string}
     */
    getLocalScript() {
        let script = path.join(process.cwd(), 'node_modules/frontplate-cli/lib/frp.js');
        try {
            if (fs.statSync(script).isFile()) {
                return script;
            }
        } catch (e) {
        }
        return path.join(__dirname, 'frp.js');
    },
    /**
     * Create dest file path
     * @param pattern{string} glob pattern string
     * @param dest{string} dest path
     * @param filepath{string} filepath
     * @param ext{string} file extension
     * @returns {string}
     */
    destPath(pattern, dest, filepath, ext) {
        let globStats = globBase(pattern),
            baseExt = path.extname(filepath),
            filename = path.basename(filepath, baseExt),
            dirname = path.dirname(filepath).replace(globStats.base, '');
        ext = ext || baseExt;
        return path.join(dest, dirname, filename + ext);
    },
    /**
     * Check file exists
     * @param filepath{string}
     * @returns {boolean}
     */
    exists(filepath) {
        try {
            let stats = fs.statSync(filepath);
            return stats.isFile() || stats.isDirectory();
        } catch (e) {}
        return false;
    },
    existsConfig() {
        let confpath = path.join(process.cwd(), 'frp.config.js');
        return Util.exists(confpath);
    },
    flatten(arr) {
        if (!arr) return [];
        return Array.prototype.concat.apply([], arr);
    }
};
module.exports = Util;