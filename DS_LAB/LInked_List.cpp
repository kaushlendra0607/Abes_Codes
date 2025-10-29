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
        cout<<"Memery allocation failed";
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
        cout<<"Node creation failed";
        return;
    }
    ptr->next = start;
    start = ptr;
}

void insert_end(){
    int value;
    cout<<"Enter value";
    cin>>value;
    struct node *ptr = create_node(value);
    if(start == NULL){
        start = ptr;
    }else{
        struct node *temp;
        temp = start;
        while(temp->next!=NULL){
            temp = temp->next;
        }
        temp->next = ptr;
    }
}

void display_list(){
    struct node *temp;
    temp = start;
    if(temp == NULL){
        cout<<"NO node exists";
        return;
    }
    while(temp!=NULL){
        cout<<temp->info<<"  ";
        temp = temp->next;
    }
    cout<<endl;
}

void insert_in_pos() {
    int item,pos;
    cout<<"Enter the element to be inserted: ";
    cin>>item;
    cout<<"Enter the position : ";
    cin>>pos;
    int count = 0;
    struct node*ptr=create_node(item);
    // struct node *temp = start;
    // while(temp->next!=NULL){
    //     temp = temp->next;
    //     count++;
    // }
    if(start==NULL){
        start=ptr;
        return;
    }
    else if(start->next == NULL){
        start->next = ptr;
        ptr->next = NULL;
    }
    else{
        struct node*temp;
        temp=start;
        // while(temp->next != NULL){
        //     temp = temp->next;
        // }
        for(int i=1;i<pos && temp!=NULL;i++){
            temp=temp->next;
        }
        if(temp==NULL){
            cout<<"Position out of range"<<endl;
        }
        else{
            ptr->next=temp->next;
            temp->next=ptr;
        }
    }
}

void delBegin(){
    struct node *temp = start;
    if(start == NULL){
        cout<<"List is already empty.";
        return;
    }
    else if(start->next == NULL){
        free(start);
        cout<<"The only node deleted no more node in the list.";
        return;
    }
    cout<<"Info is "<< start->info;
    start = temp->next;
    free(temp);
}

void delEnd(){
    struct node *temp = start;
    while(temp->next->next != NULL){
        temp = temp->next;
    }
    cout<<"Deleted info is "<<temp->next->info;
    free(temp->next);
    temp->next = NULL;
}

int countNode(){
    struct node *temp = start;
    int count = 0;
    while(temp->next != NULL){
        count++;
    }
    return count;
}

void delPos(){
    struct node *temp = start;
    int pos;
    cout<<"Enter the position : ";
    cin>>pos;
    int count = countNode();
    if(pos == 1){
        delBegin();
        return;
    }
    else if(count == pos){
        delEnd();
        return;
    }
    else if(pos>count){
        cout<<"Position is out of range.";
    }
    else{
        
    }
    int i;
    for(i=1; i<pos && temp != NULL;i++){
       temp =  temp->next;
    }
    if(i>count){
        cout<<"Pos out of range";
        return;
    }
    if(temp->next == NULL){
        cout<<"Pos out of range";
        return;
    }
    else if(start == NULL){
        cout<<"List is Already empty \n";
    }

}

int main(){
    cout<<"Enter 1-insert at begining\n2-display\n3-insertEnd\n4-insertPos\n5-delBegin\n6-delEnd\n7-exit : ";
    int choice;
    cin>>choice;
    while(choice!=7){
        switch (choice)
        {
        case 1:{
            /* code */
            insert_begin();
            break;}
        case 2:{
            display_list();
            break;
        }
        case 3:{
            insert_end();
            break;
        }
        case 4:{
            insert_in_pos();
            break;
        }
        case 5:{
            delBegin();
            break;
        }
        case 6:{
            delEnd();
            break;
        }
        default:
            cout<<"Enter valid opertaor\n";
            break;
        }
        cout<<"Enter 1-insert at begining\n2-display\n3-insertEnd\n4-insertPos\n5-delBegin\n6-delEnd\n7-exit : ";
        cin>>choice;
    }
}