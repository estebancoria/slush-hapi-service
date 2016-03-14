exports.name = 'demo_config';

exports.config = {
    $filter: 'env',
    production: 'Production demo data',
    beta: 'Beta demo data',
    $default: 'Development demo data'
};
