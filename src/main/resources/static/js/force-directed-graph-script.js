const dataUrl = 'data.json';
d3.json(dataUrl).then(data => {
    var element = document.getElementById("chart");
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const hierarchy = d3.hierarchy(data);
    hierarchy.each(d => d.data.expanded = false); // Инициализация состояния expanded

    const rootNode = hierarchy.descendants()[0];
    rootNode.fx = width / 2;
    rootNode.fy = height / 2;

    // Фильтрация узлов для отображения только первых трех уровней
    let nodes = hierarchy.descendants().filter(d => d.depth <= 2);
    let links = hierarchy.links().filter(d => d.source.depth <= 2 && d.target.depth <= 2);

    const svg = d3.select("#chart").append("svg")
        .attr("viewBox", [0, 0, width, height])
        .call(d3.zoom().on("zoom", (event) => {
            g.attr("transform", event.transform);
        }));

    const g = svg.append("g");
    const tooltip = d3.select("#tooltip")

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2));

    let link = g.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 1.5);

    let node = g.append("g")
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .attr('class', 'node')
        .call(drag(simulation));

    node.append('circle')
        .attr("r", 5)
        .attr("fill", color)
        .on("click", clicked)
        .on("mouseover", function(event, d) {
            const childrenInfo = getChildrenInfo(d);
            tooltip.transition()
                .duration(200);
            tooltip.html(childrenInfo)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500);
        });


    node.append("text")
        .text(d => d.data.name)
        .style('fill', '#000')
        .style('font-size', '12px')
        .attr('x', 6)
        .attr('y', 3);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
    });

    function color(d) {
        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        return scale(d.depth);
    }

    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    function clicked(event, d) {
        if (d.children) {
            d.children.forEach(child => {
                if (!nodes.includes(child)) {
                    nodes.push(child);
                    links.push({source: d, target: child});
                }
            });

            update();
        }
    }
    function getChildrenInfo(d) {
        if (!d.children) {
            return `<strong>${d.data.name}</strong><br>
                <strong>ФИО:</strong> ${d.data.fio}<br>
                <strong>Тип работы:</strong> ${d.data.job_type}<br>
                <strong>Номер позиции:</strong> ${d.data.pos_number}<br>`;
        }
        let info = `<strong>${d.data.name}:</strong><br>`;
        d.children.forEach(child => {
            info += `${child.data.name}<br>`;
            info += getChildrenInfo(child);
        });
        return info;
    }

    function update() {
        link = link.data(links)
            .join("line")
            .attr("stroke-width", 1.5);

        node = node.data(nodes)
            .join("g")
            .attr('class', 'node')
            .call(drag(simulation));

        node.append('circle')
            .attr("r", 5)
            .attr("fill", color)
            .on("click", clicked)
            .on("mouseover", function(event, d) {
                const childrenInfo = getChildrenInfo(d);
                tooltip.transition()
                    .duration(200);
                tooltip.html(childrenInfo)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500);
            });

        node.append("text")
            .text(d => d.data.name)
            .style('fill', '#000')
            .style('font-size', '12px')
            .attr('x', 6)
            .attr('y', 3);

        node.select('circle')
            .attr("fill", color);

        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart();
    }



    // Добавляем обработчик события на кнопку "Отобразить все элементы"
    document.getElementById("showAllButton").addEventListener("click", function() {
        // Показываем модальное окно
        var alertModal = new bootstrap.Modal(document.getElementById('alertModal'), {
            keyboard: false // Запрещаем закрытие по нажатию клавиши Esc
        });
        alertModal.show();
    });

// Обработчик для кнопки подтверждения в модальном окне
    document.getElementById('confirmShowAll').addEventListener('click', function() {
        // Закрываем модальное окно
        var alertModal = bootstrap.Modal.getInstance(document.getElementById('alertModal'));
        alertModal.hide();

        // Здесь загружаем данные и отображаем график
        const dataUrl = 'data.json';

        d3.json(dataUrl).then(data => {
            var element = document.getElementById("chart");
            const width = element.offsetWidth;
            const height = element.offsetHeight;

            const hierarchy = d3.hierarchy(data);
            hierarchy.each(d => d.data.expanded = false); // Инициализация состояния expanded

            const rootNode = hierarchy.descendants()[0];
            rootNode.fx = width / 2;
            rootNode.fy = height / 2;

            // Фильтрация узлов для отображения только первых трех уровней
            let nodes = hierarchy.descendants().filter(d => d.depth <= 3);
            let links = hierarchy.links().filter(d => d.source.depth <= 3 && d.target.depth <= 3);

            updateGraph(nodes, links);
        }).catch(error => {
            console.error('Error loading the JSON data:', error);
        });
    });

// Функция для обновления графика
    function updateGraph(nodes, links) {
        const element = document.getElementById("chart");
        const width = element.offsetWidth;
        const height = element.offsetHeight;

        const svg = d3.select("#chart").select("svg");
        svg.selectAll("*").remove(); // Очищаем старый график перед построением нового

        const g = svg.append("g");

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(50))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("center", d3.forceCenter(width / 2, height / 2));

        let link = g.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1.5);

        let node = g.append("g")
            .selectAll(".node")
            .data(nodes)
            .join("g")
            .attr('class', 'node')
            .call(drag(simulation));

        node.append('circle')
            .attr("r", 5)
            .attr("fill", color)
            .on("click", clicked)
            .on("mouseover", function(event, d) {
                const childrenInfo = getChildrenInfo(d);
                tooltip.transition()
                    .duration(200);
                tooltip.html(childrenInfo)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500);
            });

        node.append("text")
            .text(d => d.data.name)
            .style('fill', '#000')
            .style('font-size', '12px')
            .attr('x', 6)
            .attr('y', 3);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        function color(d) {
            const scale = d3.scaleOrdinal(d3.schemeCategory10);
            return scale(d.depth);
        }

        function drag(simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        function clicked(event, d) {
            if (d.children) {
                d.children.forEach(child => {
                    if (!nodes.includes(child)) {
                        nodes.push(child);
                        links.push({source: d, target: child});
                    }
                });

                updateGraph(nodes, links); // Рекурсивно обновляем график при раскрытии узлов
            }
        }

        function getChildrenInfo(d) {
            if (!d.children) {
                return `<strong>${d.data.name}</strong><br>
                    <strong>ФИО:</strong> ${d.data.fio}<br>
                    <strong>Тип работы:</strong> ${d.data.job_type}<br>
                    <strong>Номер позиции:</strong> ${d.data.pos_number}<br>`;
            }
            let info = `<strong>${d.data.name}:</strong><br>`;
            d.children.forEach(child => {
                info += `${child.data.name}<br>`;
                info += getChildrenInfo(child);
            });
            return info;
        }
    }
}).catch(error => {
    console.error('Error loading the JSON data:', error);
});
