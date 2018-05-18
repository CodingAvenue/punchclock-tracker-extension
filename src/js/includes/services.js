/**
 * DO NOT MODIFY!
 */
((context) => {
    context.keys().forEach((key) => {
        const imp = context(key);
        exports[key.replace(/^.*\/([^.]+)\.js/,'$1')] = new (imp.default && imp.__esModule ? imp.default : imp);
    });
})(require.context('./../services', true, /^(.*\.(js))[^.]*$/igm));