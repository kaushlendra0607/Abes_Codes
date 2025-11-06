
#include<stdio.h>

void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    for(int i=0;i<n;i++){
        printf("%d ",arr[i]);
    }
}

void selection_sort(int arr[],int n){
    int min = arr[0],temp;
    for(int i=0;i<n;i++){
        for(int j=i;j<n;j++){
            if(arr[j]<min){
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            min = arr[i];
        }
    }
    for(int i=0;i<n;i++){
        printf("%d ",arr[i]);
    }
}

void bubble_sort(int arr[],int n){
    for(int i=0;i<n;i++){
        int swapped = 0,temp;
        for(int j=0;j<n-i-1;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1]=temp;
                // swap(arr[j],arr[j+1]);
                swapped = 1;
            }
        }
        if(swapped == 0)
        break;
    }
    for(int i=0;i<n;i++){
        // cout<<arr[i]<<" ";
        printf("%d ",arr[i]);
    }
}

int main(){
    int n;
    printf("Enter size of array: ");
    scanf("%d",&n);
    int arr[n];
    for(int i=0;i<n;i++){
        printf("Enter %dth element: ",i+1);
        scanf("%d",&arr[i]);
    }
    int choice;
    printf("Enter 1 for bubble 2 for selection and 3 for insertion: ");
    scanf("%d",&choice);
    switch (choice)
    {
    case 1:{
        /* code */
        bubble_sort(arr,n);
        break;}
    case 2:{
        selection_sort(arr,n);
        break;
    }
    case 3:{
        insertionSort(arr,n);
        break;
    }
    
    default:
        printf("Invalid Choice.");
        break;
    }
    // bubble_sort(arr,n);
    // selection_sort(arr,n);
    return 0;
}