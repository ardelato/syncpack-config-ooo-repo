const config = {
    dependencyTypes: ['!local'],
    indent: '   ',
    source: 'pnpm-workspace.yaml',
    lintFormatting: false,
    semverGroups: [
        {
           label: 'Use reasonable ranges for peer dependencies',
           dependencyTypes: ['peer'],
           range: '^',
        },
        {
           label: 'Require exact dependencies',
           dependencyTypes: ['!peer'],
           range: '',
        },
     ],
}

export default config;
