import React from 'react';

const HighlightNotionText: React.FC<{ text: string }> = ({text}) => {
    // 定义一个正则表达式,用于匹配 <gzkNfoUU> 标签包裹的内容
    const regex = /<gzkNfoUU>(.*?)<\/gzkNfoUU>/g;

    // 使用 React.createElement 函数创建富文本节点
    const nodes = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // 添加普通文本节点
        if (match.index > lastIndex) {
            nodes.push(text.substring(lastIndex, match.index));
        }

        // 添加加粗黑色文本节点
        nodes.push(<strong className="text-neutral-900 dark:text-gray-300" key={match.index}>{match[1]}</strong>);

        lastIndex = regex.lastIndex;
    }

    // 添加最后一段普通文本节点
    if (lastIndex < text.length) {
        nodes.push(text.substring(lastIndex));
    }

    return <span className="">{nodes}</span>;
};

export default HighlightNotionText;
