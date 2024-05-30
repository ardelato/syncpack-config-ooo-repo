const config = {
    dependencyTypes: ['!local'],
    indent: '   ',
    source: 'pnpm-workspace.yaml',
    lintFormatting: false,
    versionGroups: [
         {
            label: '@types packages should only be under devDependencies',
            dependencies: ['@types/**'],
            dependencyTypes: ['!dev'],
            isBanned: true,
         },
         {
            label: 'Pin React Version',
            dependencies: ['react'],
            pinVersion: '18.2.0'
         }
    ]
}

export default config;
