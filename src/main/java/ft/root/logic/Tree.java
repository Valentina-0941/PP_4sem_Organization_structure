package ft.root.logic;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
public class Tree {
    // Класс, представляющий узел дерева
    static class TreeNode {
        String value;
        Map<String, TreeNode> children;

        public TreeNode(String value) {
            this.value = value;
            this.children = new HashMap<>();
        }
    }

    private TreeNode root;

    public Tree() {
        this.root = new TreeNode("");
    }

    // Метод для добавления URL в дерево
    public void add(String[] record) {
        TreeNode currentNode = root;

        for (String part : record) {
            if (!part.isEmpty()) {
                currentNode.children.putIfAbsent(part, new TreeNode(part));
                currentNode = currentNode.children.get(part);
            }
        }
    }

    public void printTree() {
        printTree(root, 0);
    }

    private void printTree(TreeNode node, int level) {
        for (Map.Entry<String, TreeNode> entry : node.children.entrySet()) {
            for (int i = 0; i < level; i++) {
                System.out.print("  ");
            }
            System.out.println(entry.getKey());
            printTree(entry.getValue(), level + 1);
        }
    }


    // Метод для преобразования дерева в JSON
    public String toJson() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = toJson(root);
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
    }

    private ObjectNode toJson(TreeNode node) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode jsonNode = mapper.createObjectNode();
        jsonNode.put("name", node.value);

        if (!node.children.isEmpty()) {
            for (TreeNode child : node.children.values()) {
                jsonNode.withArray("children").add(toJson(child));
            }
        }

        return jsonNode;
    }
}