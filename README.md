### Description

This is a repository to illustrate a potential bug in `syncpack` when using the `lint-semver-ranges` command with a
configuration file that includes a conflicting policies in the `versionGroup`.

The layout of the repository is as follows:
- A `pnpm-workspace.yaml` to define the workspace
- A `packages` directory with a minimalistic set of dependencies for each package
  - `packageA` is the base example with `react` declared in `dependencies`

  - `packageB` includes an additional `lodash` dependency in `devDependencies` and `peerDependencies`
    - This should trigger the `peerDependency` range policy

  - `packageC` declares `react` in `dependencies` and `peerDependencies`
    - This should also trigger the `peerDependency` range policy

  - `packageD` uses an older version of `react` in `dependencies`
    - This should trigger a mismatched version policy

  - `packageE` has both `react` in `dependencies` and `peerDependencies` and uses an older version of `react` in `peerDependencies`
    - I am assuming this should trigger both the `peerDependency` and mismatched version policies

- A `configs` directory with two configuration files for `syncpack`:
  - `withVersionGroup.mjs` includes a `versionGroup` with conflicting policies
  - `withoutVersionGroup.mjs` does not include a `versionGroup`

#### Expected Behavior

I would have expected the `lint-semver-ranges` command to only take into account the
`semverGroup` policies since the policy labels from that group are the only ones
logged in the output.

As such, I would have expected that all `peerDependencies` not using the `^` range to be flagged as errors.

![Expected Behavior without VersionGroup Config](expectedBehavior_withoutVersionGroup.png)

#### Actual Behavior

However, because there is a `pinVersion` policy for `react` in the `versionGroup`, the `lint-semver-ranges` command marks the `react` `peerDependency` in `packageC` as valid since it uses the exact pinned version.

![Actual Behavior with VersionGroup Config](actualBehavior_withVersionGroup.png)

> [!NOTE]
> Notice that the `react: 18.1.0` `peerDependency` in `packageE` was still flagged as an error since it didn't match the pinVersion from the `versionGroup` policy.

> [!NOTE]
> Additionally the `lodash` `peerDependency` in `packageB` was also flagged as an error since there was no matching policy for it in the `versionGroup`.
