current_dir="$PWD"

create_env() {
    declare -a projectDirs=(
        "$current_dir"
    )

    for project in "${projectDirs[@]}"; do
        env_file="$project/.env"
        example_content=$(<"$project/.env.example")
        echo "$example_content" >"$env_file"
    done
}

setup() {
    pnpm seed:cva $current_dir
    pnpm migrate:dev
    pnpm seed:project
    pnpm seed:networks  $current_dir
    # pnpm fund:project
    # pnpm fund:project $current_dir
    # pnpm charge:beneficiary $current_dir
}

seed_settings(){
    pnpm seed:settings $graph_url
}


graph_setup() {
    pnpm graph:create-local
    echo "Graph Deploying Locally..."
    graph_url=$(pnpm graph:deploy-local | grep -o 'http://[^ ]*' | tail -1)
    echo $graph_url
    export graph_url
}



drop_pg_database() {
    CONTAINER_NAME=postgres-rahat
    DB_NAME=$1
    docker exec -i "$CONTAINER_NAME" psql -U "rahat" -c "DROP DATABASE \"rahat-cva\" WITH (FORCE);"
}

rm_modules() {
    rm -rf dist node_modules tmp
}

gen_prisma() {
    pnpm prisma:generate
}
