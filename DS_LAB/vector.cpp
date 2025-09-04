#include<iostream>
#include<vector>
using namespace std;
main(){//to find total no. of elements in a vector we use funcn size()
    vector<int> num = {1,2,3,4,5};
    // for (int i = 0; i < num.size(); i++)
    // {
    //     /* code */cout<<num.at(i)<<"\n";//at takes the index directly
    // }
    //to acces the first and last value of a vector we use front and back
    cout<<num.front()<<"\n";
    num.push_back(6);
    cout<<num.back()<<endl;//endl is complement of "\n"

    // for (int i = 0; i < num.size(); i++)
    // {
    //     /* code */cout<<num.at(i)<<"\n";//at takes the index directly
    // }
    num.pop_back();
    // for (int i = 0; i < num.size(); i++)
    // {
    //     /* code */cout<<num.at(i)<<"\n";//at takes the index directly
    // }
    //empty funcn is used to check if a vector is empty, it returns only 0 or 1
    //0 when not empty 1 when empty
    cout<<num.empty()<<endl;
    // for(int var:num){//this syntax behaves like foreach
    //     cout<<var<<'\n';
    // };
    vector<int> num1;//assign funcn assigns the values of a vector to another vector
    num1.assign(num.begin(),num.end());//begin and end point towards the first and last elements of the vector
    num1.insert(num1.begin()+1,7);//begin and end basically work on indexes
    //here begin+1 means second index means position 1 and 7 will be added on that place
    //imp: begin and end cant be used to retrieve indexes 
    num1.insert(num1.begin()+2,3,8);
    //here begin+2 will give index 2 means 3rd position then 3 gives how many times 8 will be repeated in the vector while adding means 8 will be added 3 times 
    // for(int var:num1){//this syntax behaves like foreach
    //     cout<<var<<'\n';
    // };
    // num1.assign(3,7);//this replicates 7 three times in num1
    num1.erase(num1.begin()+1);
    //erase will delete the value at specified position .i.e index 1 here
    for(int var:num1){//this syntax behaves like foreach
        cout<<var<<'\n';
    };
    //clear funcn clears the vector completely means it makes it empty it doesnt delets the vector

    num.swap(num1);
    int num3 = 5;
    cout<<"here \n"<<(num3/2);
}