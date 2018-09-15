# ZeroGov
Propostas para um Governo com pouco gasto ou até mesmo a CUSTO ZERO

## Set it up

It is an ionic start project, so you might run the installations bellow, which are not versionated on git

1. Install NPM dependencies
```shell
    $ npm install
```

2. Install Bower dependencies
```shell
    $ bower install
```

3. Install ionic cordova dependencies
```shell
    $ ionic state restore
```


## Firebase cloud functions

Run all those commands at root folder (not inside the functions folder)

1. LogIn
```shell
    $ firebase login
```

1. Skip it if there is a function folder
```shell
    $ firebase init functions
```

1. Running the functions locally (can throw an error if promise without catch)
```shell
    $ cd functions
    $ npm run-script lint
    $ npm run-script build
    $ firebase serve --only functions
```


1. Deploy functions editions (outside functions folder)
```shell
    $ firebase deploy --only functions
```


## Production Commands
- if no release sign key, generate it (Sign pass for it app (melhor-da-vez) = zerogovapp):
    ```shell
      $ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
    ```

- Release command: project_root_path
    ```shell
        $ ionic cordova build --release android
    ```

- Sign command: root_path/platforms/android/app/build/outputs/apk/release
    ```shell
        $ cd platforms/android/app/build/outputs/apk/release/
        $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release.keystore app-release-unsigned.apk alias_name
    ```

- Verify the signature command: root_path/platforms/android/build/outputs/apk/
    ```shell
        $ rm -rf melhor-da-vez.apk && zipalign -v 4 app-release-unsigned.apk melhor-da-vez.apk
    ```

- if no zipaling set, add it to bash profile to create the alias command (MacOS X):
    ```shell
        $ nano ~/.bash_profile
        >>> alias zipalign='~/Library/Android/sdk/build-tools/VERSION/zipalign'
        $ source ~/.bash_profile
    ```


## String Formats

[Humanize Strings](https://github.com/HubSpot/humanize), more readable and a helper for Firebase Searches.


## Diagnostic Settings

[CordovaDiagnostic](https://github.com/dpa99c/cordova-diagnostic-plugin), automatic check if the device settings are enabled

## PUG

PUG is a HTML pre-compiler, which means that it have a specific semantic to generate the final HTML files.
[Check it Documentation](https://pugjs.org)

## GoogleMap PlugIn

1. create a project on [Console Developers Google](https://console.developers.google.com/apis/credentials)
2. Execute it command, with the generated keys
    ```bash
        $ cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="ANDROID_KEY" --variable API_KEY_FOR_IOS="IOS_KEY"
    ```
3. IF get any error, like on MAC, Add JAVA_HOME:
    ```bash
        $ echo "export JAVA_HOME=`/usr/libexec/java_home`" >> ~/.profile
    ```


## Cordova build error [SOLVED]

MacOS install Gradle
  ```bash
    $ brew install gradle
  ```

Export cordova Gradle version to use as local var:
  ```bash
    $ nano ~/.bash_profile
    >>> export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=http\\://services.gradle.org/distributions/gradle-4.4-all.zip
  ```

If still not working, throwing facebook strings error (add the following into platforms/android/app/src/main/res/values/strings.xml):
  ```xml
    <string name="fb_app_id">ID</string>
    <string name="fb_app_name">APP_NAME</string>
  ```
