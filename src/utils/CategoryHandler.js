function createTreeFromCategories(categories) {
    let tree = []
    let map = {}

    categories.forEach(category => {
        map[category.id] = {
            category: category,
            children: []
        }
    })

    categories.forEach(category => {
        if (category.parent_category_id === null) {
            tree.push(map[category.id])
        } else {
            if (map[category.parent_category_id]) {
                map[category.parent_category_id].children.push(map[category.id])
            }
        }
    })

    for(let i = 0; i < tree.length; i++) {
        if (tree[i].children.length === 0) {
            delete tree[i].children
        }
    }

    return tree
}

function formatTraversal(currentNode) {
    if(!currentNode) return;

    let title = currentNode.category.category_name
    let capitalized = title.charAt(0).toUpperCase() + title.slice(1)
    let currentObject = {
        title: capitalized,
        value: currentNode.category.category_name
    }

    if (currentNode.children && currentNode.children.length > 0) {
        currentObject.children = currentNode.children.map(child => formatTraversal(child)).filter(child => child !== null);
    }
    return currentObject;
}

export function formatToTreeData(categories) {
    let tree = createTreeFromCategories(categories)

    let innerArray = []
    for(let i = 0; i < tree.length; i++) {
       innerArray.push(formatTraversal(tree[i]))
    }

    return innerArray
}