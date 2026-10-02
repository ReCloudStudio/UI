{
  description = "ReCloud Studio Official UI Design System and Component Library";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "recloud-ui-dev";
          buildInputs = with pkgs; [
            bun
            nodejs_22
            git
            nixfmt-rfc-style
          ];

          shellHook = ''
            echo "ReCloud Studio UI Development Shell"
            echo "Bun $(bun --version) | Node $(node --version)"
          '';
        };
      });
}
