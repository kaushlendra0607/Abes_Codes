#include<iostream>

using namespace std;


int n;
int top = -1;
int arr[100];
void push(int value){
    if(top>=99){
        cout<<"Overflow\n";
        return;
    }
    top++;
    arr[top] = value;
}

int pop(){
    if(top<0){
        cout<<"Underflow\n";
        return -1;
    }
    int a;
    a = arr[top];
    top--;
    return a;
}

bool isEmpty() {
    return top == -1;
}

bool isFull() {
    return top == 99;
}
int main(){
    int n;
    int x;
    int c=1;
   
    while(c!=0){
        cout<<"Press 1 for push\nPress 2 for pop\nPress 3 to display\nPress 4 to exit \n";
        cin>>n;
        switch (n)
        {
        case 1:
            /* code */
            cout<<"Enter value to push\n";
            cin>>x;
            push(x);
            break;
        case 2:
            x=pop();
            if(x == -1){
                cout<<"No value to pop\n";
            }
            else{
                cout<<"Popped value: "<<x<<endl;
            }
            break;
        case 3:
            if(top<0){
                cout<<"Empty stack\n";
            }else{
                for(int i=0;i<=top;i++){
                    cout<<" "<<arr[i]<<"\n";
                }
            }
            break;
        case 4:
            c = 0;
            break;
        default:
            cout<<"Enter valid choice\n";
            break;
        }
    }
}