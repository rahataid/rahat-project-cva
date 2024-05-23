#! /bin/sh

pnpm install

source './tools/scripts/utils.sh'

create_env
gen_prisma
setup
seed_settings
# graph_setup

