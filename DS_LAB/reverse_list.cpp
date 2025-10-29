#include<iostream>
#include<stdlib.h>
using namespace std;

struct node{
    int info;
    struct node *next;
};
struct node *start;
struct node *new_node;
struct node *create_node(int value){
    new_node = (struct node *) malloc(sizeof(struct node));
    new_node->info = value;
    new_node->next = NULL;
    // start = new_node;
    if(new_node  == NULL){
        cout<<"Memery allocation failed\n";
        return NULL;
    }
    return new_node;
}

void insert_begin(){
    int value;
    cout<<"Give info: ";
    cin>>value;
    struct node *ptr;
    ptr  = create_node(value);
    if(ptr == NULL){
        cout<<"Node creation failed. Overflow\n";
        return;
    }
    ptr->next = start;
    start = ptr;
}

void delBegin(){
    struct node *temp = start;
    if(start == NULL){
        cout<<"List is already empty. Underflow\n";
        return;
    }
    else if(start->next == NULL){
        free(start);
        cout<<"The only node deleted no more node in the list.\n";
        return;
    }
    cout<<"Info is "<< start->info<<endl;
    start = temp->next;
    free(temp);
}

void display_list(){
    struct node *temp;
    temp = start;
    if(temp == NULL){
        cout<<"NO node exists. Underflow\n";
        return;
    }
    while(temp!=NULL){
        cout<<temp->info<<"  ";
        temp = temp->next;
    }
    cout<<endl;
}

struct rev_list{
    int value;
    struct rev_list *point;
} *head = NULL;