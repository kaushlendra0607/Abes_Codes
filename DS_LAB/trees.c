#include <stdio.h>
#include <stdlib.h>
struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}
void inorderTraversal(struct Node* root) {
    if (root == NULL) return;
    inorderTraversal(root->left);
    printf("%d ", root->data);
    inorderTraversal(root->right);
}
void preorderTraversal(struct Node* root) {
    if (root == NULL) return;
    printf("%d ", root->data);
    preorderTraversal(root->left);
    preorderTraversal(root->right);
}
void postorderTraversal(struct Node* root) {
    if (root == NULL) return;
    postorderTraversal(root->left);
    postorderTraversal(root->right);
    printf("%d ", root->data);
}
int getHeight(struct Node* root) {
    if (root == NULL) return 0;   
    int leftHeight = getHeight(root->left);
    int rightHeight = getHeight(root->right);
    return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
}
int countLeafNodes(struct Node* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) {
        return 1;
    }   
    return countLeafNodes(root->left) + countLeafNodes(root->right);
}
int countTwoChildNodes(struct Node* root) {
    if (root == NULL) return 0;
    int count = 0;
    if (root->left != NULL && root->right != NULL) {
        count = 1;
    }   
    return count + countTwoChildNodes(root->left) + countTwoChildNodes(root->right);
}
int countTotalNodes(struct Node* root) {
    if (root == NULL) return 0;
    return 1 + countTotalNodes(root->left) + countTotalNodes(root->right);
}
struct Node* insertNode(struct Node* root, int data) {
    if (root == NULL) {
        return createNode(data);
    }
    if (data < root->data) {
        root->left = insertNode(root->left, data);
    } else if (data > root->data) {
        root->right = insertNode(root->right, data);
    }
    return root;
}
int main() {
    struct Node* root = NULL;
    int choice, value;
    while(1) {
        printf("\nMENU\n");
        printf("1. Insert Node\n");
        printf("2. Show Traversals (Part A)\n");
        printf("3. Show Statistics (Part B)\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch(choice) {
            case 1:
                printf("Enter integer to insert: ");
                scanf("%d", &value);
                root = insertNode(root, value);
                printf("Inserted %d successfully.\n", value);
                break;
            case 2:
                if (root == NULL) {
                    printf("Tree is empty!\n");
                } else {
                    printf("\nTraversals\n");
                    printf("Inorder:   "); inorderTraversal(root); printf("\n");
                    printf("Preorder:  "); preorderTraversal(root); printf("\n");
                    printf("Postorder: "); postorderTraversal(root); printf("\n");
                }
                break;
            case 3:
                if (root == NULL) {
                    printf("Tree is empty!\n");
                } else {
                    printf("\nStatistics\n");
                    printf("Height of Tree:           %d\n", getHeight(root));
                    printf("Count of Total Nodes:     %d\n", countTotalNodes(root));
                    printf("Count of Leaf Nodes:      %d\n", countLeafNodes(root));
                    printf("Count of Two-Child Nodes: %d\n", countTwoChildNodes(root));
                }
                break;
            case 4:
                printf("Exiting program.\n");
                exit(0);
            default:
                printf("Invalid choice! Please try again.\n");
        }
    }
    return 0;
}